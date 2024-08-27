<template>
  <div class="px-3">
    <div class="m-auto mt-4 max-w-[1000px] rounded-md bg-pink-100 p-2 shadow-lg lg:px-10">
      <div class="my-2 text-center text-lg font-bold lg:text-2xl">預約須知</div>
      <div class="leading-7 lg:text-lg">
        <p>1. 每品項最多可二人同作, 第三人需獨立製作一份甜點。</p>
        <p>2. 因安全考量,無論是否有大人陪同,6歲以下小朋友都無法入場。</p>
        <p>3. 所有訂位『僅保留10分鐘』須全員到齊,逾時請現場候位。</p>
        <p>4. 甜點製作環境,寵物無法入店。</p>
        <p>5. 店內嚴禁:外食、菸、酒、檳榔。</p>
        <p>6. 甜點製作為:平板教學+自助取材料。</p>
        <p>7. 訂位時間僅開放到前一個月。</p>
        <p>8. 最晚須於前一天預約。</p>
      </div>
      <div class="flex justify-center">
        <div
          class="my-3 mr-4 w-fit cursor-pointer rounded-sm bg-gray-100 px-2 py-1 text-black"
          @click="back"
        >
          取消
        </div>
        <div
          class="my-3 w-fit cursor-pointer rounded-sm bg-amber-800 px-2 py-1 text-white"
          @click="toInformation"
        >
          我知道了
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
function toInformation() {
  router.push({
    path: '/order/information'
  })
}
function back() {
  router.go(-1)
}
</script>

<style></style>
