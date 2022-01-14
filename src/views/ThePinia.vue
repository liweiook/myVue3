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

// 使用pinia的storeToRefs解构，使userSrore中属性保持响应式
const { name } = storeToRefs(userStore)

// 修改store：可以直接只用userStore.name='李四'，但不建议
// userStore.name = '李四'

// 使用$path修改store中的数据
userStore.$patch({
  name: '用$path可以直接修改state中的值，不需要声明actions'
})

// 或者在store中通过声明actions修改
userStore.updateName('李四')

// getters中的值也可以直接结构出来，但是没有响应式
const { fullName } = userStore
</script>

<style scoped></style>
