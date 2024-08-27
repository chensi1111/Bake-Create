<template>
  <div>
    <!-- LoadingState 組件會顯示 loading 動畫 -->
    <LoadingState v-if="isLoading" />
    <!-- NuxtPage 是當前頁面的內容 -->
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const isLoading = ref(true)

onMounted(async () => {
  // 等待 DOM 更新完成後再設定 loading 為 false
  await nextTick()
  isLoading.value = false
})
</script>
