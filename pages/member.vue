<template>
  <div class="min-h-screen bg-pink-200 pt-20">
    <div class="m-auto w-4/5 bg-white shadow-lg">
      <div class="flex">
        <div
          class="w-1/2 cursor-pointer py-2 text-center font-bold"
          :class="{ activate: currentPath === '/member' }"
          @click="toLogin"
        >
          登入
        </div>
        <div
          class="w-1/2 cursor-pointer py-2 text-center font-bold"
          :class="{ activate: currentPath === '/member/register' }"
          @click="toRegister"
        >
          註冊
        </div>
      </div>
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const currentPath = computed(() => {
  return route.path
})
function toLogin() {
  router.push({
    path: '/member'
  })
}
function toRegister() {
  router.push({
    path: '/member/register'
  })
}
</script>

<style>
.activate {
  border-bottom: solid 2px black;
}
</style>
