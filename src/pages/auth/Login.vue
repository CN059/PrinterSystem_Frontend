<template>
  <v-card max-width="400" class="mx-auto">
    <v-card-title class="text-h5">用户登录</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="form.account"
        label="用户名"
        variant="outlined"
        :error="!!errors.account"
        :error-messages="errors.account"
      />
      <v-text-field
        v-model="form.password"
        label="密码"
        type="password"
        variant="outlined"
        :error="!!errors.password"
        :error-messages="errors.password"
      />
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" block @click="handleLogin">登录</v-btn>
    </v-card-actions>
    <v-card-text class="text-center">
      <router-link to="/">返回首页</router-link>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { userApi } from "@/api"; // 使用封装后的 API
import { setToken } from "@/utils/storage";

const router = useRouter();

const form = reactive({
  account: "",
  password: "",
});

const errors = ref<Partial<Record<keyof typeof form, string>>>({});

const validate = (): boolean => {
  errors.value = {};
  if (!form.account.trim()) errors.value.account = "请输入用户名";
  if (!form.password) errors.value.password = "请输入密码";
  return Object.keys(errors.value).length === 0;
};

const handleLogin = async () => {
  if (!validate()) return;
  try {
    const data = await userApi.login(form); // data: UserLoginResponse = { token: string }
    if (!data || typeof data.token !== "string") {
      throw new Error("登录失败：认证令牌缺失");
    }
    setToken(data.token);
    router.push("/");
  } catch (err: any) {
    console.error("[Login Error]", err.message);
  }
};
</script>
