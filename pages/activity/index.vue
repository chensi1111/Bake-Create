<template>
  <div class="mb-[150px] px-3">
    <div class="my-4 flex items-center text-lg font-bold md:text-2xl">
      活動列表<el-icon class="animate-moveIcon"><DArrowRight /></el-icon>
    </div>
    <div class="rounded-md bg-yellow-500 p-3">
      <div
        v-for="activity in activityStore.activities"
        :key="activity.name"
        class="mb-2 cursor-pointer rounded-md bg-white px-2 py-1 hover:bg-sky-100"
      >
        <div @click="toDetail(activity)">
          <div class="flex justify-between">
            <div class="text-sm font-bold md:text-base">{{ activity.name }}</div>
            <div class="flex items-center text-xs font-bold md:text-sm">
              查看詳情<el-icon><DArrowRight /></el-icon>
            </div>
          </div>
          <div class="mt-1 flex items-center justify-between">
            <div
              v-if="compareDate(activity.date) === 'future'"
              class="border border-green-600 px-1 text-sm text-green-600"
            >
              報名中
            </div>
            <div
              v-if="compareDate(activity.date) === 'past'"
              class="border border-red-600 px-1 text-sm text-red-600"
            >
              已結束
            </div>
            <div class="text-xs md:text-sm">{{ activity.date }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const activityStore = useActivityStore()
const { compareDate } = useCompareDate()
const router = useRouter()
function toDetail(activity: any) {
  router.push({
    path: activity.path,
    query: { date: activity.date, time: activity.time, type: activity.type }
  })
}
</script>

<style></style>
