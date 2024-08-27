<template>
  <div class="px-3">
    <div class="m-auto mt-4 max-w-[1000px] rounded-md bg-pink-100 p-2 shadow-lg lg:px-10">
      <div class="md:flex">
        <div
          class="flex overflow-hidden rounded-md md:order-2 md:w-2/5 md:flex-col md:justify-center"
        >
          <div class="w-1/2 md:w-full">
            <img
              :src="getImageUrl(`${activityStore.activitySource}.png`)"
              :alt="activityStore.activityName"
            />
          </div>
          <div class="flex w-1/2 flex-col justify-center bg-white pl-3 md:w-full">
            <div class="mb-1 text-lg font-bold md:mt-3 lg:text-xl"></div>
            <div class="font-bold">活動名稱 :{{ activityStore.activityName }}</div>
            <div class="font-bold">活動日期 :{{ activityStore.activityDate }}</div>
            <div class="font-bold">活動時間 :{{ activityStore.activityTime }}</div>
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
            <div class="font-bold">活動名稱</div>
            <select v-model="activity" class="my-1 w-full py-1 pl-2">
              <option
                v-for="item in activityStore.activitiesNow"
                :key="item.name"
                :value="item.name"
              >
                <div>{{ item.name }} - {{ item.date }}-{{ item.time }}</div>
              </option>
            </select>
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
const activityStore = useActivityStore()

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
const name = ref()
const phone = ref()
const mail = ref()
const activity = ref(activityStore.activityName)

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
  if (name.value && phone.value && !mailError.value && activity.value) {
    const orderId = nanoid(10)

    const orderDocRef = doc(db, 'users', currentUser.value.uid, 'activities', orderId)

    setDoc(orderDocRef, {
      name: name.value,
      phone: phone.value,
      mail: mail.value,
      ID: orderId,
      activity: activityStore.activityName,
      date: activityStore.activityDate,
      time: activityStore.activityTime,
      type: activityStore.activitySource,
      orderTime: getOrderTime(),
      state: '報名成功'
    }).then(() => {
      router.push({
        path: '/activity/signUp/complete',
        query: {
          name: name.value,
          phone: phone.value,
          mail: mail.value,
          ID: orderId,
          activity: activityStore.activityName,
          date: activityStore.activityDate,
          time: activityStore.activityTime
        }
      })
    })
  } else {
    isError.value = true
  }
}

// 監聽活動選項
watch(activity, (newActiyity: string) => {
  const selecteActivity = activityStore.activities.find((item: any) => item.name === newActiyity)
  if (selecteActivity) {
    activityStore.activityName = selecteActivity.name
    activityStore.activityDate = selecteActivity.date
    activityStore.activityTime = selecteActivity.time
    activityStore.activitySource = selecteActivity.type
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
</script>

<style>
.el-date-editor {
  --el-date-editor-width: 100%;
}
</style>
