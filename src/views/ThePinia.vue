<template>
  <div>{{ userStore.name }}</div>
  <div>{{ myName }}</div>
  <div>{{ name }}</div>
  <div>{{ fullName }}</div>
  <h1>this is pinia</h1>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useUserStore } from '@/store/piniaUser'

const userStore = useUserStore()
// 使用computed拿到name
const myName = computed(() => userStore.name)

// 使用pinia的storeToRefs解构
const { name } = storeToRefs(userStore)
// 修改store：可以直接只用userStore.name='李四'，但不建议
// userStore.name = '李四'
// 应该在store中通过声明actions修改
userStore.updateName('李四')

const { fullName } = userStore
</script>

<style scoped></style>
