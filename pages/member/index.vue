<template>
  <div class="p-3">
    <div class="mb-3">
      <el-input v-model="email" placeholder="信箱" :class="{ error: errorEmail }" />
      <div v-show="errorEmail" class="mt-1 text-sm text-red-500">{{ errorEmail }}</div>
    </div>
    <div>
      <el-input
        v-model="password"
        placeholder="密碼"
        :class="{ error: errorPassword }"
        show-password
      />
      <div v-show="errorPassword" class="mt-1 text-sm text-red-500">
        {{ errorPassword }}
      </div>
    </div>
    <div class="mt-4">
      <div class="mb-2 cursor-pointer bg-black py-1 text-center text-white" @click="signIn">
        登入
      </div>
      <div class="mb-2 cursor-pointer bg-black py-1 text-center text-white" @click="toRegister">
        註冊新帳號
      </div>
    </div>

    <div class="mt-10 text-center text-sm">其他方式登入</div>
    <div class="mt-4 flex justify-center">
      <img src="../../assets/facebook.png" alt="faceBook" class="mr-5 h-10 w-10 cursor-pointer" />
      <img src="../../assets/google.png" alt="google" class="h-10 w-10 cursor-pointer" />
    </div>
    <el-dialog v-model="dialogVisible" title="提示">
      <span>登入成功，{{ count }}秒後將自動跳轉</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="confirmSignIn"> 確認 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
const router = useRouter()
const email = ref()
const password = ref()
const errorEmail = ref()
const errorPassword = ref()
const dialogVisible = ref(false)
const count = ref(3)
const auth = getAuth()
const signIn = () => {
  errorEmail.value = ''
  errorPassword.value = ''
  if (!email.value) {
    errorEmail.value = 'Email不能為空'
    return
  }
  if (!password.value) {
    errorPassword.value = '密碼不能為空'
    return
  }
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      // 3秒後自動跳轉
      dialogVisible.value = true
      const counting = setInterval(() => {
        count.value--
        if (count.value === 0) {
          clearInterval(counting)
          confirmSignIn()
        }
      }, 1000)
    })
    .catch((error: any) => {
      if (error.code === 'auth/invalid-email') {
        errorEmail.value = '請輸入正確Email'
      }
      if (error.code === 'auth/missing-password') {
        errorPassword.value = '密碼不能為空'
      }
      if (error.code === 'auth/invalid-credential') {
        errorPassword.value = '密碼錯誤'
      }
    })
}
function confirmSignIn() {
  dialogVisible.value = false
  router.push({
    path: '/'
  })
}
function toRegister() {
  router.push({
    path: '/member/register'
  })
}
</script>

<style scoped>
.error {
  border: 2px solid red;
}
</style>
