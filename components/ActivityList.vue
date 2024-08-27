<template>
  <div v-if="userActivities">
    <div v-if="!userActivities.length" class="text-center">查無已報名活動</div>
    <div v-if="userActivities.length">
      <div v-for="activity in userActivities" :key="activity.id">
        <el-collapse>
          <el-collapse-item>
            <template #title>
              <div class="flex w-full justify-between px-1 lg:px-2 lg:text-sm">
                <div>{{ activity.ID }}</div>
                <div>{{ activity.orderTime }}</div>
              </div>
            </template>
            <div class="flex items-center px-2">
              <div class="w-24 phone:w-32">
                <img :src="getImageUrl(`${activity.type}.png`)" :alt="activity.name" />
              </div>
              <div class="ml-4 text-sm lg:text-base">
                <div><span class="font-bold">活動</span> : {{ activity.name }}</div>
                <div>
                  <span class="font-bold">時間</span> : {{ activity.date }} {{ activity.time }}
                </div>
                <div><span class="font-bold">狀態</span> : {{ activity.state }}</div>
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
const userActivities = ref()

const getUserActivities = async (user: any) => {
  if (user) {
    const activityCollection = collection(db, 'users', user.uid, 'activities')
    const activitySnapshot = await getDocs(activityCollection)
    userActivities.value = activitySnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data()
    }))
  }
}
watchEffect(() => {
  if (currentUser.value) {
    getUserActivities(currentUser.value)
  }
})
watchEffect(() => {
  if (userActivities.value) {
    userActivities.value = userActivities.value.sort((a: any, b: any) => {
      const timeA = new Date(a.orderTime)
      const timeB = new Date(b.orderTime)
      return timeB.getTime() - timeA.getTime()
    })
  }
})
</script>

<style></style>
