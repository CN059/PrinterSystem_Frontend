<template>
  <div class="home">
    <h1>欢迎使用打印管理系统</h1>
    <p>这是一个基于 Vue3 + Vuetify 的打印管理前端。</p>
    <div v-if="!isLoggedIn">
      <p>请先 <router-link to="/auth/login">登录</router-link> 开始使用。</p>
    </div>
    <div v-else>
      <p>您已登录，可以上传文件、创建订单等。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getToken } from "@/utils/storage";

const isLoggedIn = computed(() => !!getToken());
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
}
</style>
