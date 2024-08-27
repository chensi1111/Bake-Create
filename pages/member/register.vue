<template>
  <div class="p-3">
    <div class="mb-3">
      <el-input v-model="name" placeholder="姓名" :class="{ error: errorName }" />
      <div v-show="errorName" class="mt-1 text-sm text-red-500">{{ errorName }}</div>
    </div>
    <div class="mb-3">
      <el-input v-model="email" placeholder="信箱" :class="{ error: errorEmail }" />
      <div v-show="errorEmail" class="mt-1 text-sm text-red-500">{{ errorEmail }}</div>
    </div>
    <div class="mb-3">
      <el-input v-model="phone" placeholder="電話" :class="{ error: errorPhone }" />
      <div v-show="errorPhone" class="mt-1 text-sm text-red-500">{{ errorPhone }}</div>
    </div>
    <div class="mb-3">
      <el-input
        v-model="password"
        placeholder="至少6位數密碼"
        :class="{ error: errorPassword }"
        show-password
      />
      <div v-show="errorPassword" class="mt-1 text-sm text-red-500">{{ errorPassword }}</div>
    </div>
    <div class="mb-3">
      <el-input
        v-model="passwordCheck"
        placeholder="確認密碼"
        :class="{ error: errorPassword }"
        show-password
      />
    </div>
    <div class="mt-4">
      <div class="mb-2 cursor-pointer bg-black py-1 text-center text-white" @click="signUp">
        註冊
      </div>
    </div>
    <div class="mt-5 text-center">
      已經有帳號?<span class="ml-2 cursor-pointer font-bold" @click="toSignIn">點我登入</span>
    </div>
    <el-dialog v-model="dialogVisible" title="提示">
      <span>登入成功，{{ count }}秒後將自動跳轉</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="confirmSignUp"> 確認 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, Firestore, setDoc } from 'firebase/firestore'
const { $firebaseDb } = useNuxtApp()
const db = $firebaseDb as Firestore
const router = useRouter()

// 資料
const name = ref()
const email = ref()
const phone = ref()
const password = ref()
const passwordCheck = ref()
const errorName = ref()
const errorEmail = ref()
const errorPassword = ref()
const errorPhone = ref()
const count = ref(3)
const dialogVisible = ref(false)

// 註冊
const auth = getAuth()
const signUp = () => {
  errorName.value = ''
  errorEmail.value = ''
  errorPassword.value = ''
  errorPhone.value = ''

  if (!name.value) {
    errorName.value = '請輸入姓名'
    return
  }
  if (!email.value) {
    errorEmail.value = '請輸入信箱'
    return
  }
  if (!phone.value) {
    errorPhone.value = '請輸入電話號碼'
    return
  }
  if (password.value !== passwordCheck.value) {
    errorPassword.value = '密碼不相同'
    return
  }
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential: any) => {
      const user = userCredential.user

      try {
        await updateProfile(user, { displayName: name.value })

        await setDoc(doc(db, 'users', user.uid), {
          phone: phone.value,
          userName: name.value,
          email: email.value
        })

        // 3秒後自動跳轉
        dialogVisible.value = true
        const counting = setInterval(() => {
          count.value--
          if (count.value === 0) {
            clearInterval(counting)
            confirmSignUp()
          }
        }, 1000)
      } catch (error) {
        ElMessage({
          message: '註冊失敗',
          type: 'error'
        })
        console.log(error)
      }
    })
    .catch((error: any) => {
      if (error.code === 'auth/invalid-email') {
        errorEmail.value = '請輸入正確Email'
      }
      if (error.code === 'auth/email-already-in-use') {
        errorEmail.value = '該email已使用'
      } else {
        if (error.code === 'auth/missing-password') {
          errorPassword.value = '密碼不能為空'
        }
        if (error.code === 'auth/weak-password') {
          errorPassword.value = '密碼不能少於6位數'
        }
      }
    })
}

// 路由
function confirmSignUp() {
  dialogVisible.value = false
  router.push({
    path: '/'
  })
}
function toSignIn() {
  router.push({
    path: '/member'
  })
}
</script>

<style scoped>
.error {
  border: 2px solid red;
}
</style>
