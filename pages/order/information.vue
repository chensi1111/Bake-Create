<template>
  <div class="px-3">
    <div class="m-auto mt-4 max-w-[1000px] rounded-md bg-pink-100 p-2 shadow-lg lg:px-10">
      <div class="md:flex">
        <div
          class="flex overflow-hidden rounded-md md:order-2 md:w-2/5 md:flex-col md:justify-center"
        >
          <div class="w-1/2 md:w-full">
            <img
              :src="getImageUrl(`${selectProduct.productSource}.png`)"
              :alt="selectProduct.productName"
            />
          </div>
          <div class="flex w-1/2 flex-col justify-center bg-white pl-3 md:w-full">
            <div class="mb-1 text-lg font-bold md:mt-3 lg:text-xl">
              {{ selectProduct.productName }}
            </div>
            <div class="font-bold">時長 : {{ selectProduct.productTime }}hr</div>
            <div class="font-bold">價格 : $ {{ selectProduct.productPrice }}</div>
          </div>
        </div>
        <div class="mt-3 md:mr-4 md:w-3/5">
          <div class="mb-2">
            <div class="font-bold"><span class="text-red-800">*</span>姓名</div>
            <input
              v-model="name"
              type="text"
              placeholder="請輸入姓名"
              class="my-1 w-full py-1 pl-2"
            />
            <div v-show="!name && isError" class="text-sm text-red-800">姓名為必填</div>
          </div>
          <div class="mb-2">
            <div class="font-bold"><span class="text-red-800">*</span>電話</div>
            <input
              v-model="phone"
              type="text"
              placeholder="請輸入電話"
              class="my-1 w-full py-1 pl-2"
            />
            <div v-show="!phone && isError" class="text-sm text-red-800">電話為必填</div>
          </div>
          <div class="mb-2">
            <div class="font-bold"><span class="text-red-800">*</span>信箱</div>
            <input
              v-model="mail"
              type="text"
              placeholder="請輸入信箱"
              class="my-1 w-full py-1 pl-2"
            />
            <div v-show="mailError && isError" class="text-sm text-red-800">{{ mailError }}</div>
          </div>
          <div class="mb-2">
            <div class="font-bold">甜點品項</div>
            <select v-model="dessert" class="my-1 w-full py-1 pl-2">
              <option v-for="item in selectProduct.allProducts" :key="item.name" :value="item.name">
                <div>{{ item.name }} - ${{ item.price }}</div>
              </option>
            </select>
          </div>
          <div class="mb-2">
            <div class="font-bold">加購生日蛋糕</div>
            <label>
              <input
                v-model="selectProduct.birthdayCake"
                type="radio"
                name="birthdayCake"
                value="true"
              />
              是
            </label>
            <label>
              <input
                v-model="selectProduct.birthdayCake"
                type="radio"
                name="birthdayCake"
                value="false"
              />
              否
            </label>
          </div>
          <div class="mb-2">
            <div class="font-bold"><span class="text-red-800">*</span>預約日期</div>
            <el-date-picker
              v-model="date"
              type="date"
              placeholder="選擇日期"
              class="my-1"
              :disabled-date="disabledDate"
            />
            <div v-show="!date && isError" class="text-sm text-red-800">日期為必填</div>
          </div>
          <div class="mb-2">
            <div class="font-bold"><span class="text-red-800">*</span>預約時間</div>
            <el-time-select
              v-model="time"
              placeholder="選擇時間"
              start="09:00"
              step="00:30"
              end="17:00"
            />
            <div v-show="!time && isError" class="text-sm text-red-800">時間為必填</div>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <div
          class="my-3 mr-4 w-fit cursor-pointer rounded-sm bg-gray-100 px-2 py-1 text-black"
          @click="back"
        >
          上一步
        </div>
        <div
          class="my-3 w-fit cursor-pointer rounded-sm bg-amber-800 px-2 py-1 text-white"
          @click="toComplete"
        >
          下一步
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, Firestore, setDoc } from 'firebase/firestore'
const { getImageUrl } = useAssets()
const selectProduct = useSelectProductStore()

// firebase
const { $firebaseDb } = useNuxtApp()
const db = $firebaseDb as Firestore
const auth = getAuth()
const currentUser = ref()
onAuthStateChanged(auth, (user: any) => {
  if (user) {
    currentUser.value = user
  } else {
    currentUser.value = null
  }
})

// 資料
const dessert = ref(selectProduct.productName)
const name = ref()
const phone = ref()
const mail = ref()
const date = ref()
const time = ref()

// 禁止的時間
const disabledDate = (date: Date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date <= today
}

// email格式
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const isError = ref(false)
function isValidEmail(email: string) {
  return emailRegex.test(email)
}
const mailError = computed(() => {
  if (!mail.value) {
    return '信箱為必填'
  } else if (!isValidEmail(mail.value)) {
    return '請輸入正確格式'
  } else {
    return undefined
  }
})

// 路由
const router = useRouter()
function back() {
  router.go(-1)
}

// 下單
function toComplete() {
  if (name.value && phone.value && !mailError.value && date.value) {
    const orderId = nanoid(10)
    const birthday = computed(() => (selectProduct.birthdayCake ? '是' : '否'))

    const orderDocRef = doc(db, 'users', currentUser.value.uid, 'orders', orderId)

    setDoc(orderDocRef, {
      name: name.value,
      phone: phone.value,
      mail: mail.value,
      date: formattedDate(date.value),
      time: time.value,
      dessert: dessert.value,
      birthday: birthday.value,
      ID: orderId,
      source: selectProduct.productSource,
      price: selectProduct.productPrice,
      orderTime: getOrderTime(),
      state: '訂單處理中'
    }).then(() => {
      router.push({
        path: '/order/complete',
        query: {
          name: name.value,
          phone: phone.value,
          mail: mail.value,
          date: formattedDate(date.value),
          time: time.value,
          dessert: dessert.value,
          birthday: birthday.value,
          ID: orderId
        }
      })
    })
  } else {
    isError.value = true
  }
}

// 監聽甜點選項
watch(dessert, (newDessert: string) => {
  const selectedProduct = selectProduct.allProducts.find((item: any) => item.name === newDessert)
  if (selectedProduct) {
    selectProduct.productName = selectedProduct.name
    selectProduct.productPrice = selectedProduct.price
    selectProduct.productTime = selectedProduct.time
    selectProduct.productSource = selectedProduct.source
  }
})

// 下單時間
function getOrderTime() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
}

function formattedDate(date: string) {
  return new Date(date).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
</script>

<style>
.el-date-editor {
  --el-date-editor-width: 100%;
}
</style>
