<script setup lang="ts">
// 这里不需要引入任何组件，Vite 会自动解析
</script>

<template>
  <!-- 路由会根据路径渲染对应的布局组件（DefaultLayout 或 AuthLayout） -->
  <router-view />
</template>

<style scoped>
/* 全局可选样式 */
</style>
