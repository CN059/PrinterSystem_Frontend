<template>
  <v-app>
    <!-- 顶部导航 -->
    <v-app-bar app color="primary" dark>
      <v-toolbar-title style="cursor: pointer" @click="$router.push('/')">
        打印管理系统
      </v-toolbar-title>
      <v-spacer />
      <v-btn text to="/orders">订单管理</v-btn>
      <v-btn text to="/documents">文档中心</v-btn>
    </v-app-bar>

    <!-- 主内容区 -->
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
