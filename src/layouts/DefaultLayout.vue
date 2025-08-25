<!-- src/layouts/DefaultLayout.vue -->

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

const router = useRouter()
const drawer = ref(false)
const theme = useTheme()

// 直接从 global.name 读取主题名称
const themeName = ref(theme.global.name.value)

// 切换主题
const toggleTheme = () => {
  const nextTheme = theme.global.name.value === 'dark' ? 'light' : 'dark'
  theme.global.name.value = nextTheme
  themeName.value = nextTheme
  localStorage.setItem('app-theme', nextTheme)
}

// 退出登录
const handleLogout = () => {
  localStorage.removeItem('auth_token')
  router.push('/auth/login')
}

// 页面加载时恢复主题
onMounted(() => {
  const savedTheme = localStorage.getItem('app-theme')
  const validThemes = ['light', 'dark']

  if (savedTheme && validThemes.includes(savedTheme)) {
    theme.global.name.value = savedTheme
    themeName.value = savedTheme
  } else {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    theme.global.name.value = systemPrefersDark ? 'dark' : 'light'
    themeName.value = systemPrefersDark ? 'dark' : 'light'
  }
})
</script>

<template>
  <v-app>
    <!-- 顶部导航 -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title style="cursor: pointer" @click="$router.push('/')">
        轻松打印
      </v-toolbar-title>

      <v-spacer />

      <!-- 导航菜单 -->
      <v-btn text to="/orders">订单管理</v-btn>
      <v-btn text to="/documents">文档中心</v-btn>

      <!-- 主题切换按钮 -->
      <v-btn
        icon
        @click="toggleTheme"
        class="mx-2"
        :aria-label="`切换到${themeName === 'dark' ? '浅色' : '深色'}模式`"
      >
        <v-icon>{{ themeName === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>

      <!-- 退出按钮 -->
      <v-btn icon @click="handleLogout" data-test="logout-btn">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- 侧边栏 -->
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list nav>
        <v-list-item
          v-for="item in [
            { title: '首页', to: '/', icon: 'mdi-home' },
            { title: '订单管理', to: '/orders', icon: 'mdi-package-variant' },
            { title: '文档中心', to: '/documents', icon: 'mdi-file-document' },
            { title: '个人中心', to: '/profile', icon: 'mdi-account' },
          ]"
          :key="item.to"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          link
        />
      </v-list>
    </v-navigation-drawer>

    <!-- 主内容区 -->
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
/* 可选：为图标增加平滑过渡 */
.v-btn {
  transition: transform 0.2s ease;
}
.v-btn:hover {
  transform: scale(1.05);
}
</style>
