<template>
  <div v-if="currentUser" class="m-auto mb-[150px] px-3 md:w-4/5 lg:max-w-[1000px]">
    <div class="mt-3 text-center text-2xl font-bold lg:text-start">
      {{ currentUser?.displayName }}，歡迎回來
    </div>
    <div class="m-auto mt-3 rounded-md bg-gray-200 p-2 md:px-5">
      <div class="flex justify-between">
        <div class="text-lg font-bold">個人資料</div>
        <div v-if="!userEdit" class="cursor-pointer" @click="userEdit = true">更改</div>
        <div v-if="userEdit" class="cursor-pointer" @click="userEdit = false">取消</div>
      </div>
      <div class="my-2 flex font-bold">
        名字<span class="mx-3">{{ userData.userName }}</span>
        <div v-if="userEdit" class="cursor-pointer" @click="saveNameChange">儲存</div>
      </div>
      <el-input v-if="userEdit" v-model="name" placeholder="名字"></el-input>
      <div class="my-2 flex font-bold">
        信箱<span class="mx-3">{{ userData.email }}</span>
        <div v-if="!sameEmail" class="mr-3 text-red-500">尚未驗證</div>
        <div v-if="userEdit" class="cursor-pointer" @click="saveEmailChange">儲存</div>
      </div>
      <el-input v-if="userEdit" v-model="email" placeholder="信箱"></el-input>
      <el-input
        v-if="userEdit"
        v-model="password"
        placeholder="請輸入密碼已進行驗證"
        show-password
        class="mt-1"
      ></el-input>

      <div class="my-2 flex font-bold">
        電話<span class="mx-3">{{ userData.phone }}</span>
        <div v-if="userEdit" class="cursor-pointer" @click="savePhoneChange">儲存</div>
      </div>
      <el-input v-if="userEdit" v-model="phone" placeholder="電話"></el-input>
    </div>
    <div class="m-auto mt-3 rounded-md bg-gray-200 p-2 md:px-5">
      <div class="mb-2 flex justify-between">
        <div class="text-lg font-bold">處理中訂單</div>
        <div class="cursor-pointer">訂單管理</div>
      </div>
      <OrderList></OrderList>
    </div>
    <div class="m-auto mt-3 rounded-md bg-gray-200 p-2 md:px-5">
      <div class="mb-2 flex justify-between">
        <div class="text-lg font-bold">已報名活動</div>
        <div class="cursor-pointer">活動管理</div>
      </div>
      <ActivityList></ActivityList>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  EmailAuthProvider,
  verifyBeforeUpdateEmail,
  reauthenticateWithCredential,
  signOut
} from 'firebase/auth'
import { getDoc, doc, Firestore, updateDoc } from 'firebase/firestore'
const router = useRouter()
const { $firebaseDb } = useNuxtApp()
const db = $firebaseDb as Firestore
const auth = getAuth()
const currentUser = ref()
onAuthStateChanged(auth, (user: any) => {
  if (user) {
    currentUser.value = user
  } else {
    currentUser.value = null
  }
})
// 獲取用戶資料
const userData = ref()
const getUserData = async (user: any) => {
  if (user) {
    const userDoc = await getDoc(doc(db, 'users', user.uid))
    if (userDoc.exists()) {
      userData.value = userDoc.data()
    }
  }
}

// 個人資料
const name = ref()
const email = ref()
const phone = ref()
const password = ref()
const userEdit = ref(false)
const sameEmail = ref()

// 檢查信箱是否一樣
function checkEmail() {
  if (userData.value.email === currentUser.value.email) {
    sameEmail.value = true
  } else {
    sameEmail.value = false
  }
}

watchEffect(() => {
  if (currentUser.value) {
    getUserData(currentUser.value)
  }
})

watch(userData, (data: any) => {
  name.value = data.userName
  email.value = data.email
  phone.value = data.phone
  checkEmail()
})

// 更新名字
async function saveNameChange() {
  await updateProfile(currentUser.value, {
    displayName: name.value
  })
  updateDoc(doc(db, 'users', currentUser.value.uid), {
    userName: name.value
  })
  ElMessage({
    message: '姓名更新成功',
    type: 'success'
  })
  getUserData(currentUser.value)
}

// 更新電話
async function savePhoneChange() {
  await updateDoc(doc(db, 'users', currentUser.value.uid), {
    phone: phone.value
  })
  ElMessage({
    message: '電話號碼更新成功',
    type: 'success'
  })
  getUserData(currentUser.value)
}

// 更新信箱
async function saveEmailChange() {
  if (currentUser.value) {
    if (email.value === userData.value.email) {
      ElMessageBox.alert('新信箱不得與舊信箱相同', '提示', {
        confirmButtonText: '確認'
      })
    } else {
      // 用email和舊密碼作為認證
      const credential = EmailAuthProvider.credential(currentUser.value.email, password.value)
      try {
        await reauthenticateWithCredential(currentUser.value, credential)
        await verifyBeforeUpdateEmail(currentUser.value, email.value)
        ElMessageBox.alert('驗證信已成功發送，請查看您的新信箱', '提示', {
          confirmButtonText: '確認'
        })
          .then(() => {
            updateDoc(doc(db, 'users', currentUser.value.uid), {
              email: email.value
            })
            ElMessageBox.alert('請在驗證新信箱後再重新登入', '提示', {
              confirmButtonText: '確認'
            }).then(() => {
              signOut(auth)
              router.push({
                path: '/member'
              })
            })
          })
          .catch(() => {})
      } catch (error: any) {
        if (error.code === 'auth/missing-password') {
          ElMessageBox.alert('密碼不得為空', '提示', {
            confirmButtonText: '確認'
          })
        }
        if (error.code === 'auth/invalid-credential') {
          ElMessageBox.alert('密碼錯誤', '提示', {
            confirmButtonText: '確認'
          })
        }
        if (error.code === 'auth/missing-new-email') {
          ElMessageBox.alert('信箱不得為空', '提示', {
            confirmButtonText: '確認'
          })
        }
        if (error.code === 'auth/invalid-new-email') {
          ElMessageBox.alert('信箱格式錯誤', '提示', {
            confirmButtonText: '確認'
          })
        }
      }
    }
  }
}
</script>

<style></style>
