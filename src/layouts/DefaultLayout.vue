<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>打印管理系统</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="gotoLogin" v-if="!isLoggedIn">
        <v-icon>mdi-login</v-icon>
      </v-btn>
      <v-btn icon @click="handleLogout" v-else
        ><v-icon>mdi-logout</v-icon></v-btn
      >
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getToken } from "@/utils/storage";
import { logout } from "@/utils/logout";

const route = useRoute();
const router = useRouter();

const isLoggedIn = computed(() => !!getToken());
const gotoLogin = () => {
  router.push("/auth/login");
};
const handleLogout = () => {
  logout();
  window.location.reload();
};
</script>
