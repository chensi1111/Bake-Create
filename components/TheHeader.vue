<template>
  <div class="sticky top-0 z-50">
    <div class="header-color flex h-20 items-center justify-between px-3 lg:h-28">
      <div class="box-border w-24 cursor-pointer py-2 lg:w-32" @click="toHome">
        <img src="../assets/logo.png" alt="Bake & Create" />
      </div>
      <div class="flex">
        <div class="lg:hidden">
          <i
            v-if="currentUser"
            class="fa-solid fa-user mx-3 cursor-pointer text-3xl"
            @click="toggleUser"
          ></i>
          <i
            v-if="!currentUser"
            class="fa-regular fa-user mx-3 cursor-pointer text-3xl"
            @click="toggleUser"
          ></i>
        </div>
        <div v-if="!currentUser" class="hidden lg:block">
          <i class="fa-regular fa-user order-2 mx-5 cursor-pointer text-3xl" @click="toMember"></i>
        </div>
        <div v-if="currentUser" class="order-2 mx-5 hidden lg:block">
          <el-dropdown>
            <i class="fa-solid fa-user text-3xl text-black outline-0"></i>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>您好，{{ currentUser?.displayName }}</el-dropdown-item>
                <el-dropdown-item divided @click="toUser">會員中心</el-dropdown-item>
                <el-dropdown-item @click="handleSignOut">登出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="cursor-pointer text-3xl lg:hidden" @click="toggleNav">
          <i v-show="!isNavOpen" class="fa-solid fa-bars"></i>
          <i v-show="isNavOpen" class="fa-solid fa-xmark"></i>
        </div>
        <div class="hidden lg:flex">
          <div class="mr-2 cursor-pointer text-2xl font-bold hover:text-blue-600" @click="toDIY">
            DIY課程
          </div>
          <div
            class="mr-2 cursor-pointer text-2xl font-bold hover:text-blue-600"
            @click="toActicity"
          >
            活動報名
          </div>
          <div class="mr-2 cursor-pointer text-2xl font-bold hover:text-blue-600">場地租借</div>
        </div>
      </div>
    </div>
    <div v-show="isNavOpen" class="header-color cursor-pointer text-center font-bold lg:hidden">
      <div class="py-2 hover:bg-pink-300" @click="toDIY">DIY課程</div>
      <div class="py-2 hover:bg-pink-300" @click="toActicity">活動報名</div>
      <div class="py-2 hover:bg-pink-300">場地租借</div>
    </div>
    <div v-show="isUserOpen" class="header-color cursor-pointer text-center font-bold lg:hidden">
      <div v-if="!currentUser" class="py-2 hover:bg-pink-300" @click="toMember">登入</div>
      <div v-if="!currentUser" class="py-2 hover:bg-pink-300" @click="toRegiser">註冊</div>
      <div v-if="currentUser" class="py-2 hover:bg-pink-300" @click="toUser">會員中心</div>
      <div v-if="currentUser" class="py-2 hover:bg-pink-300" @click="handleSignOut">登出</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

// 會員狀態
const auth = getAuth()
const currentUser = ref()
onAuthStateChanged(auth, (user: any) => {
  if (user) {
    currentUser.value = user
  } else {
    currentUser.value = null
  }
})

// 登出
const handleSignOut = () => {
  isUserOpen.value = false
  signOut(auth)
    .then(() => {
      router.push({
        path: '/member'
      })
      ElMessage({
        message: '登出成功',
        type: 'success',
        plain: true
      })
    })
    .catch((error: any) => {
      console.log('登出失敗', error)
    })
}

// 導覽頁開關
const isNavOpen = ref(false)
function toggleNav() {
  isNavOpen.value = !isNavOpen.value
  isUserOpen.value = false
}
const isUserOpen = ref(false)
function toggleUser() {
  isUserOpen.value = !isUserOpen.value
  isNavOpen.value = false
}

// 路由
const router = useRouter()
function toMember() {
  isUserOpen.value = false
  router.push({
    path: '/member'
  })
}
function toRegiser() {
  isUserOpen.value = false
  router.push({
    path: '/member/register'
  })
}
function toHome() {
  isNavOpen.value = false
  router.push({
    path: '/'
  })
}
function toDIY() {
  isNavOpen.value = false
  router.push({
    path: '/DIY'
  })
}
function toActicity() {
  isNavOpen.value = false
  router.push({
    path: '/activity'
  })
}
function toUser() {
  isUserOpen.value = false
  router.push({
    path: '/user'
  })
}
</script>
<style scoped></style>
