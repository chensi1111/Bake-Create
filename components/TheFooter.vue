<template>
  <div class="fixed bottom-0 z-[2000] flex h-32 w-full justify-around border-t bg-white pb-5 pt-3">
    <div class="w-14 cursor-pointer" @click="toHome">
      <img src="../assets/cake.png" alt="首頁" />
      <div class="pt-1 text-center text-sm font-bold">首頁</div>
    </div>
    <div class="w-14 cursor-pointer" @click="toDIY">
      <img src="../assets//menu.png" alt="菜單" />
      <div class="pt-1 text-center text-sm font-bold">菜單</div>
    </div>
    <div class="w-14 cursor-pointer" @click="toUser">
      <img src="../assets//order.png" alt="訂單" />
      <div class="pt-1 text-center text-sm font-bold">我的訂位</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
function toHome() {
  router.push({
    path: '/'
  })
}
function toDIY() {
  router.push({
    path: '/DIY'
  })
}
function toUser() {
  router.push({
    path: '/user'
  })
}
</script>

<style></style>
