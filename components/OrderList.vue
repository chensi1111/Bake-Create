<template>
  <div v-if="userOrders">
    <div v-if="!userOrders.length" class="text-center">查無已報名活動</div>
    <div v-if="userOrders.length">
      <div v-for="order in userOrders" :key="order.id">
        <el-collapse>
          <el-collapse-item>
            <template #title>
              <div class="flex w-full justify-between px-1 lg:px-2 lg:text-sm">
                <div>{{ order.ID }}</div>
                <div>{{ order.orderTime }}</div>
              </div>
            </template>
            <div class="flex items-center px-2">
              <div class="w-24 phone:w-32">
                <img :src="getImageUrl(`${order.source}.png`)" :alt="order.dessert" />
              </div>
              <div class="ml-4 text-sm lg:text-base">
                <div><span class="font-bold">品項</span> : {{ order.dessert }}</div>
                <div><span class="font-bold">價錢</span> : $ {{ order.price }}</div>
                <div><span class="font-bold">時間</span> : {{ order.date }} {{ order.time }}</div>
                <div v-if="order.birthday === '是'">加購生日蛋糕</div>
                <div><span class="font-bold">狀態</span> : {{ order.state }}</div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, Firestore } from 'firebase/firestore'
const { getImageUrl } = useAssets()
const { $firebaseDb } = useNuxtApp()
const db = $firebaseDb as Firestore
// firestore
const auth = getAuth()
const currentUser = ref()
onAuthStateChanged(auth, (user: any) => {
  if (user) {
    currentUser.value = user
  } else {
    currentUser.value = null
  }
})
const userOrders = ref()

const getUserOrders = async (user: any) => {
  if (user) {
    const ordersCollection = collection(db, 'users', user.uid, 'orders')
    const orderSnapshot = await getDocs(ordersCollection)
    userOrders.value = orderSnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data()
    }))
  }
}
watchEffect(() => {
  if (currentUser.value) {
    getUserOrders(currentUser.value)
  }
})
watchEffect(() => {
  if (userOrders.value) {
    userOrders.value = userOrders.value.sort((a: any, b: any) => {
      const timeA = new Date(a.orderTime)
      const timeB = new Date(b.orderTime)
      return timeB.getTime() - timeA.getTime()
    })
  }
})
</script>

<style></style>
