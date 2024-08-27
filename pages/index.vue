<template>
  <div class="px-3 md:px-8 lg:px-20">
    <div class="lg:flex">
      <div v-for="nav in navs" :key="nav.name">
        <div
          class="group relative m-auto my-3 mr-3 cursor-pointer overflow-hidden rounded-md"
          @click="toNav(nav.path)"
        >
          <img :src="getImageUrl(`${nav.source}.png`)" :alt="nav.name" />
          <div
            class="absolute bottom-0 flex h-12 w-full items-center justify-center bg-gray-800/[.5] py-2 text-lg font-bold text-white transition-[height] duration-500 group-hover:h-full"
          >
            {{ nav.name }}
          </div>
        </div>
      </div>
    </div>

    <div class="my-4 flex items-center text-lg font-bold md:text-2xl">
      限定款式<i class="fa-solid fa-angles-right animate-moveIcon"></i>
    </div>
    <div ref="carouselContainer" class="m-auto lg:w-[1000px]">
      <el-carousel
        ref="carousel"
        arrow="always"
        class="m-auto mt-5 w-full cursor-pointer"
        :height="carouselHeight"
      >
        <el-carousel-item v-for="special in specials" :key="special.name">
          <img
            :src="getImageUrl(`${special.source}.png`)"
            :alt="special.name"
            @click="toDIY(special.section)"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div>
      <div class="my-4 flex items-center text-lg font-bold md:text-2xl">
        甜點分類<i class="fa-solid fa-angles-right animate-moveIcon"></i>
      </div>
      <div class="flex space-x-4 overflow-x-auto py-2 lg:justify-around">
        <div
          v-for="type in types"
          :key="type.name"
          class="flex-shrink-0 cursor-pointer overflow-hidden rounded-md hover:translate-x-1 hover:translate-y-1"
          @click="toDIY(type.section)"
        >
          <div class="flex h-10 items-center justify-center bg-pink-200 font-bold">
            {{ type.name }}
          </div>
          <div class="w-48 md:w-64">
            <img :src="getImageUrl(`${type.source}.png`)" :alt="type.name" />
          </div>
        </div>
      </div>
    </div>
    <div class="mb-4">
      <div class="my-4 flex items-center text-lg font-bold md:text-2xl">
        活動快訊<i class="fa-solid fa-angles-right animate-moveIcon"></i>
      </div>
      <div class="rounded-md bg-yellow-500 p-3">
        <div
          v-for="activity in activityStore.activities.slice(0, 4)"
          :key="activity.name"
          class="mb-2 cursor-pointer rounded-md bg-white px-2 py-1 hover:bg-sky-100"
        >
          <div class="flex justify-between">
            <div class="text-sm font-bold md:text-base">{{ activity.name }}</div>
            <div class="flex items-center text-xs font-bold md:text-sm">
              詳情<el-icon><DArrowRight /></el-icon>
            </div>
          </div>
          <div class="text-end text-xs md:text-sm">{{ activity.date }}</div>
        </div>
        <div
          class="cursor-pointer text-end text-sm font-bold underline-offset-4 hover:underline"
          @click="toActivity"
        >
          查看更多
        </div>
      </div>
    </div>
    <div class="mb-[150px] flex flex-wrap justify-center rounded-md bg-gray-200 py-3">
      <div
        v-for="info in infos"
        :key="info.name"
        class="mx-2 mb-4 w-[calc(50%-16px)] phone:w-[calc(33%-24px)]"
      >
        <div
          class="m-auto w-fit cursor-pointer border-b-2 border-black pb-2 text-center font-bold hover:border-blue-500 hover:text-blue-500 md:text-lg"
        >
          {{ info.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTouchSwipe } from '~/composables/useTouchSwipe'
const router = useRouter()
const selectSection = useSelectSectionStore()
const activityStore = useActivityStore()
const { getImageUrl } = useAssets()
const navs = ref([
  { name: 'DIY課程', source: 'DIY', path: '/DIY' },
  { name: '活動報名', source: 'reserve', path: '/activity' },
  { name: '場地租借', source: 'rent', path: '/rent' }
])
const specials = ref([
  {
    name: '生日限定款式',
    source: 'birthday',
    section: 'birthdayCake'
  },
  {
    name: '中秋限定款式',
    source: 'moon-festival',
    section: 'moonFestivalCake'
  }
])
const types = ref([
  { name: '中秋限定', source: 'moonCake', section: 'moonFestivalCake' },
  { name: '生日蛋糕', source: 'birthdayCake', section: 'birthdayCake' },
  { name: '蛋糕', source: 'redVelvetCake', section: 'cake' },
  { name: '塔派', source: 'lemonPie', section: 'pie' },
  { name: '點心', source: 'coffeeDonut', section: 'snack' }
])

const infos = ref([
  { name: '品牌介紹' },
  { name: '服務項目' },
  { name: '產業合作' },
  { name: '分店資訊' },
  { name: '常見問題' },
  { name: '聯絡我們' }
])

const carousel = ref()
const carouselContainer = ref<HTMLElement | null>(null)
const windowWidth = ref()
const carouselWidth = ref()
const carouselHeight = computed(() => {
  return carouselWidth.value ? `${carouselWidth.value * 0.666}px` : ''
})
const handleResize = () => {
  windowWidth.value = window.innerWidth
  updateCarouselWidth()
}
const scrollLeft = () => {
  carousel.value?.prev()
}

const scrollRight = () => {
  carousel.value?.next()
}
const updateCarouselWidth = () => {
  if (carouselContainer.value) {
    carouselWidth.value = carouselContainer.value.getBoundingClientRect().width
  }
}
useTouchSwipe(carouselContainer, scrollLeft, scrollRight)
onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('resize', handleResize)
    updateCarouselWidth()
  }
})
onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', handleResize)
  }
})

function toNav(route: string) {
  router.push({
    path: route
  })
}
function toDIY(query: string) {
  router.push({ path: '/DIY' }).then(async () => {
    await nextTick()
    setTimeout(() => {
      selectSection.section = query
    }, 300)
  })
}
function toActivity() {
  router.push({
    path: '/activity'
  })
}
</script>
