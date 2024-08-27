<template>
  <div>
    <el-steps
      style="max-width: 1000px"
      :active="step"
      align-center
      class="m-auto mt-4"
      finish-status="success"
    >
      <el-step title="注意事項" />
      <el-step title="填寫資料" />
      <el-step title="訂單完成" />
    </el-steps>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const step = ref(1)

const updateStep = () => {
  if (route.path === '/order') {
    step.value = 0
  } else if (route.path === '/order/information') {
    step.value = 1
  } else if (route.path === '/order/complete') {
    step.value = 2
  }
}

watch(
  () => route.path,
  () => {
    updateStep()
  }
)

onMounted(() => {
  updateStep()
})
</script>

<style>
@media screen and (min-width: 1024px) {
  .el-step__title {
    font-size: 23px;
  }
}
</style>
