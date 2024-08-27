<template>
  <div class="p-3 md:px-16 lg:px-24">
    <div
      class="my-1 w-fit cursor-pointer border-2 border-transparent p-1 text-lg font-bold hover:border-black"
      @click="toActivity"
    >
      返回活動列表
    </div>
    <div class="items-center lg:flex">
      <div class="lg:w-2/5"><img :src="getImageUrl(`${type}.png`)" /></div>
      <div class="lg:ml-5 lg:flex lg:w-3/5 lg:flex-col lg:justify-between">
        <div>
          <div class="my-2 text-xl font-bold lg:text-2xl">{{ id }}</div>
          <div class="lg:text-lg">
            <span class="font-bold">活動時間</span> : {{ date }} {{ time }}
          </div>
          <div
            v-if="compareDate(date) === 'future'"
            class="my-2 w-fit border-2 border-green-600 p-1 font-bold text-green-600"
          >
            報名中
          </div>
          <div
            v-if="compareDate(date) === 'past'"
            class="my-2 w-fit border-2 border-red-600 p-1 font-bold text-red-600"
          >
            已結束
          </div>
        </div>

        <div class="lg:text-lg">{{ introduce }}</div>
        <div
          class="mt-10 w-full cursor-pointer rounded-md bg-yellow-500 p-1 text-center font-bold hover:bg-yellow-400"
          @click="signUp"
        >
          點我報名
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const activityStore = useActivityStore()
const route = useRoute()
const router = useRouter()
const { getImageUrl } = useAssets()
const { compareDate } = useCompareDate()
const { id } = route.params
const date = route.query.date as string
const time = route.query.time
const type = route.query.type
const introduce = computed(() => {
  switch (type) {
    case 'social':
      return '歡迎參加我們的「甜點聯誼會」，一個讓甜點愛好者們相聚、交流的完美機會！在這裡，您將有機會與同樣熱愛甜點的朋友們分享您的甜點心得、技巧與創作經驗。我們準備了各式各樣的手做甜點樣本供大家品嚐，並且提供專業的甜點師傅分享製作秘訣。這是一個結識新朋友、增進甜點知識、並且享受美味甜點的絕佳平台。加入我們，一同探索甜點的世界吧！'
    case 'interest':
      return '「甜點同好會」是我們為甜點愛好者量身打造的一場盛會！如果您對甜點製作充滿熱情，這裡是您展示創意、交流技巧的理想場所。在活動中，我們會提供各種甜點製作材料和工具，讓您可以親手製作自己喜愛的甜點。您還可以和其他甜點愛好者一起探討製作技巧，互相學習。這是一次提升甜點製作技藝的好機會，快來參與吧！'
    case 'couple':
      return '為了讓您的情人節更加甜蜜，我們準備了一場「情人節甜點DIY」活動。這是一個讓您和摯愛之人一同享受甜點製作樂趣的機會。在這個活動中，我們將提供各種情人節主題的甜點製作材料，並由專業甜點師傅指導如何製作浪漫甜品。無論是心形巧克力、粉紅色蛋糕還是可愛的甜點裝飾，您都可以在這裡找到完美的製作靈感。讓我們一起打造一個甜蜜的情人節回憶吧！'
    case 'moon':
      return '迎接中秋佳節，我們特別舉辦「中秋月餅DIY」活動。這次活動中，您將有機會親自動手製作傳統的中秋月餅。我們將提供各式月餅製作材料，包括餅皮、餡料以及模具，並由專業師傅指導每一步製作過程。無論您是月餅新手還是有經驗的甜點愛好者，都能在這裡找到製作月餅的樂趣與滿足感。製作完成後，您還可以帶回自己親手做的月餅，和家人一起慶祝中秋佳節！'
  }
})
function signUp() {
  if (compareDate(date) === 'past') {
    ElMessageBox.alert('活動已停止報名', '提示', {
      confirmButtonText: '確認'
    })
  } else {
    activityStore.activityName = id
    activityStore.activityDate = date
    activityStore.activityTime = time
    activityStore.activitySource = type
    router.push({
      path: '/activity/signUp'
    })
  }
}

function toActivity() {
  router.push({
    path: '/activity'
  })
}
</script>

<style></style>
