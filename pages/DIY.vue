<template>
  <div class="relative px-3 md:px-8 lg:px-20">
    <div class="fixed right-0 top-1/2 z-50 -translate-y-1/2 rounded-sm bg-white/[.8] text-center">
      <div v-for="item in navs" :key="item.name">
        <div
          class="cursor-pointer p-2 font-bold hover:bg-pink-100"
          @click="scrollToSection(item.section)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="mb-3 mt-1 text-center text-2xl font-bold">選擇款式</div>
    <div
      id="birthdayCake"
      ref="birthdayCake"
      class="border-b-2 border-black py-2 text-xl font-bold"
    >
      壽星優惠(限當日壽星)
    </div>
    <div v-for="item in selectProduct.birthday" :key="item.name">
      <div
        class="relative my-2 mr-2 cursor-pointer md:w-80"
        @click="openDialog(item.name, item.price, item.time, item.source, item.material)"
      >
        <img :src="getImageUrl(`${item.source}.png`)" :alt="item.name" />
        <div
          class="absolute bottom-0 flex w-full justify-between bg-black/[.4] px-4 py-2 text-lg font-bold text-white"
        >
          <div>{{ item.name }}</div>
          <div>$ {{ item.price }}</div>
        </div>
      </div>
    </div>
    <div
      id="moonFestivalCake"
      ref="moonFestivalCake"
      class="border-b-2 border-black py-2 text-xl font-bold"
    >
      中秋節限定
    </div>
    <div class="flex-wrap md:flex">
      <div v-for="item in selectProduct.moonFestival" :key="item.name">
        <div
          class="relative my-2 mr-2 cursor-pointer md:w-80"
          @click="openDialog(item.name, item.price, item.time, item.source, item.material)"
        >
          <img :src="getImageUrl(`${item.source}.png`)" :alt="item.name" />
          <div
            class="absolute bottom-0 flex w-full justify-between bg-black/[.4] px-4 py-2 text-lg font-bold text-white"
          >
            <div>{{ item.name }}</div>
            <div>$ {{ item.price }}</div>
          </div>
        </div>
      </div>
    </div>

    <div id="cake" ref="cake" class="border-b-2 border-black py-2 text-xl font-bold">蛋糕</div>
    <div class="flex-wrap md:flex">
      <div v-for="item in selectProduct.cakes" :key="item.name">
        <div
          class="relative my-2 mr-2 cursor-pointer md:w-80"
          @click="openDialog(item.name, item.price, item.time, item.source, item.material)"
        >
          <img :src="getImageUrl(`${item.source}.png`)" :alt="item.name" />
          <div
            class="absolute bottom-0 flex w-full justify-between bg-black/[.4] px-4 py-2 text-lg font-bold text-white"
          >
            <div>{{ item.name }}</div>
            <div>$ {{ item.price }}</div>
          </div>
        </div>
      </div>
    </div>

    <div id="pie" ref="pie" class="border-b-2 border-black py-2 text-xl font-bold">塔派</div>
    <div class="flex-wrap md:flex">
      <div v-for="item in selectProduct.pies" :key="item.name">
        <div
          class="relative my-2 mr-2 cursor-pointer md:w-80"
          @click="openDialog(item.name, item.price, item.time, item.source, item.material)"
        >
          <img :src="getImageUrl(`${item.source}.png`)" :alt="item.name" />
          <div
            class="absolute bottom-0 flex w-full justify-between bg-black/[.4] px-4 py-2 text-lg font-bold text-white"
          >
            <div>{{ item.name }}</div>
            <div>$ {{ item.price }}</div>
          </div>
        </div>
      </div>
    </div>

    <div id="snack" ref="snack" class="border-b-2 border-black py-2 text-xl font-bold">點心</div>
    <div class="flex-wrap md:flex">
      <div v-for="item in selectProduct.snacks" :key="item.name">
        <div
          class="relative my-2 mr-2 cursor-pointer md:w-80"
          @click="openDialog(item.name, item.price, item.time, item.source, item.material)"
        >
          <img :src="getImageUrl(`${item.source}.png`)" :alt="item.name" />
          <div
            class="absolute bottom-0 flex w-full justify-between bg-black/[.4] px-4 py-2 text-lg font-bold text-white"
          >
            <div>{{ item.name }}</div>
            <div>$ {{ item.price }}</div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogFormVisible" :width="dialogWidth">
      <div class="lg:flex">
        <div class="mr-2 mt-2 lg:w-1/2">
          <img :src="getImageUrl(`${dialogImg}.png`)" :alt="dialogName" />
        </div>
        <div class="lg:w-1/2">
          <div class="my-2 flex justify-between">
            <div class="text-2xl font-bold">{{ dialogName }}</div>
            <div class="font-bold">預計耗時 : {{ dialogTime }}hr</div>
          </div>
          <div>可兩人一同製作, 第三人需獨立製作一份甜點</div>
          <div v-if="dialogName === '生日蛋糕'" class="text-red-500">
            備註:免費生日蛋糕優惠需搭配另一種類蛋糕使用
          </div>
          <div v-if="dialogName === '生日蛋糕'">
            <select v-model="dessert" class="my-1 w-full py-1 pl-2">
              <option value="請選擇款式" disabled selected>請選擇款式</option>
              <option v-for="item in selectProduct.allProducts" :key="item.name" :value="item.name">
                <div>{{ item.name }} - ${{ item.price }}</div>
              </option>
            </select>
          </div>
          <div class="my-2 text-xl font-bold">產品特色</div>
          <div>
            <li>
              主體:
              {{ dialogMaterial.main }}
            </li>
            <li>
              內餡:
              {{ dialogMaterial.filling }}
            </li>
            <li>
              裝飾:
              {{ dialogMaterial.decoration }}
            </li>
          </div>

          <div class="my-2 text-xl font-bold">保存方式</div>
          <div>
            <li>製作完成後需在2小時內冷藏。</li>
            <li>請冷藏至少2小時,待內餡凝固再食用。</li>
            <li>請於3天內食用完,口感較佳。</li>
          </div>
          <div class="my-2 text-end text-2xl font-bold">價格 : $ {{ dialogPrice }}</div>
        </div>
      </div>
      <div class="rounded-md bg-pink-100 px-4 py-2 lg:text-lg">
        <p>1. 因安全考量,無論是否有大人陪同,6歲以下小朋友都無法入場。</p>
        <p>2. 所有訂位『僅保留10分鐘』須全員到齊,逾時請現場候位。</p>
        <p>3. 甜點製作環境,寵物無法入店, 嚴禁:外食、菸、酒、檳榔。</p>
      </div>

      <template #footer>
        <div class="lg:px-10">
          <el-button @click="dialogFormVisible = false">關閉</el-button>
          <el-button type="primary" @click="toOrder"> 立即預約 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
const { getImageUrl } = useAssets()
const selectSection = useSelectSectionStore()
const selectProduct = useSelectProductStore()
const router = useRouter()
const navs = ref([
  { name: '生日優惠', section: 'birthdayCake' },
  { name: '中秋限定', section: 'moonFestivalCake' },
  { name: '蛋糕', section: 'cake' },
  { name: '塔派', section: 'pie' },
  { name: '點心', section: 'snack' }
])

const birthdayCake = ref(null)
const moonFestivalCake = ref(null)
const cake = ref(null)
const pie = ref(null)
const snack = ref(null)
const dessert = ref('請選擇款式')
const offset = computed(() => {
  if (windowWidth.value >= 1024) {
    return 112
  } else {
    return 80
  }
})
const scrollToSection = async (sectionId: string) => {
  await nextTick()
  const sections: Record<string, Ref<HTMLElement | null>> = {
    birthdayCake,
    moonFestivalCake,
    cake,
    pie,
    snack
  }

  const section = sections[sectionId]
  if (section?.value) {
    const element = section.value
    const rect = element.getBoundingClientRect()
    const scrollPosition = window.scrollY + rect.top - offset.value
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    })
  }
}

interface Material {
  main?: string
  filling?: string
  decoration?: string
}
const dialogWidth = computed(() => {
  if (windowWidth.value > 768) {
    return '50%'
  } else {
    return '90%'
  }
})
const windowWidth = ref()
const dialogFormVisible = ref(false)
function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}
const dialogName = ref()
const dialogTime = ref()
const dialogPrice = ref()
const dialogImg = ref()
const dialogMaterial = ref()
function openDialog(name: string, price: number, time: number, img: string, material: Material) {
  dessert.value = '請選擇款式'
  dialogName.value = name
  dialogPrice.value = price
  dialogTime.value = time
  dialogImg.value = img
  dialogMaterial.value = material
  dialogFormVisible.value = true
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('resize', updateWindowWidth)
  }
  updateWindowWidth()
})
onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', updateWindowWidth)
  }
})
watchEffect(() => {
  if (selectSection.section) {
    scrollToSection(selectSection.section)
  }
})

function toOrder() {
  if (dialogName.value === '生日蛋糕') {
    if (dessert.value === '請選擇款式') {
      ElMessageBox.alert('請選擇蛋糕款式', '提示', {
        confirmButtonText: '確認'
      })
      return
    } else {
      const productOption = selectProduct.allProducts.find(
        (product) => product.name === dessert.value
      )
      if (productOption) {
        selectProduct.productName = productOption.name
        selectProduct.productPrice = productOption.price
        selectProduct.productSource = productOption.source
        selectProduct.productTime = productOption.time
        selectProduct.birthdayCake = true
      }
    }
  } else {
    selectProduct.productName = dialogName.value
    selectProduct.productPrice = dialogPrice.value
    selectProduct.productSource = dialogImg.value
    selectProduct.productTime = dialogTime.value
    selectProduct.birthdayCake = false
  }
  dialogFormVisible.value = false
  router.push({
    path: '/order'
  })
}
</script>

<style>
.el-overlay.is-message-box {
  z-index: 2040 !important;
}
</style>
