<template>
  <div class="px-3">
    <div class="m-auto mt-4 max-w-[800px] rounded-md bg-pink-100 p-2 shadow-lg md:p-10">
      <div class="border-2 border-black p-2">
        <div class="flex items-center justify-between">
          <div class="mt-1 text-lg font-bold">訂單編號 :</div>
          <div class="flex items-center">
            <div v-if="copySuccess" class="mr-2 text-sm">已複製</div>
            <i class="fa-solid fa-copy cursor-pointer" @click="copyID"></i>
          </div>
        </div>
        <div>{{ ID }}</div>
        <div class="mt-1 text-lg font-bold">預約時間 :</div>
        <div>{{ date }} {{ time }}</div>
        <div class="mt-1 text-lg font-bold">姓名 :</div>
        <div>{{ name }}</div>
        <div class="mt-1 text-lg font-bold">電話 :</div>
        <div>{{ phone }}</div>
        <div class="mt-1 text-lg font-bold">信箱 :</div>
        <div>{{ mail }}</div>
        <div class="mt-1 text-lg font-bold">品項 :</div>
        <div>{{ dessert }}</div>
        <div class="mt-1 text-lg font-bold">加購生日蛋糕 :</div>
        <div>{{ birthday }}</div>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="my-3 mr-4 w-fit cursor-pointer rounded-sm bg-gray-100 px-2 py-1 text-black">
        匯出
      </div>
      <div
        class="my-3 w-fit cursor-pointer rounded-sm bg-amber-800 px-2 py-1 text-white"
        @click="toUser"
      >
        完成
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const ID = route.query.ID as string
const name = route.query.name as string
const phone = route.query.phone as string
const mail = route.query.mail as string
const date = route.query.date as string
const time = route.query.time as string
const dessert = route.query.dessert as string
const birthday = route.query.birthday as string
const copySuccess = ref(false)
function copyID() {
  // 使用 Clipboard API 將 ID 複製到剪貼板
  navigator.clipboard.writeText(ID).then(() => {
    copySuccess.value = true
    setTimeout(() => (copySuccess.value = false), 2000)
  })
}

onMounted(() => {
  ElMessage({
    message: '訂單成功',
    type: 'success'
  })
})

function toUser() {
  router.push({
    path: '/user'
  })
}
</script>

<style></style>
