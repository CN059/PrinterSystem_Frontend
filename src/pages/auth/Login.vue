<!-- Login.vue -->
<template>
  <v-card max-width="450" class="mx-auto" elevation="4">
    <v-card-title class="text-h5 font-weight-bold text-center pt-8">
      {{ isLogin ? "用户登录" : "用户注册" }}
    </v-card-title>

    <v-card-text class="pb-2">
      <!-- 注册表单 -->
      <div v-if="!isLogin">
        <v-text-field
          v-model="registerForm.username"
          label="用户名"
          variant="outlined"
          :error="!!registerErrors.username"
          :error-messages="registerErrors.username"
          class="mb-4"
          clearable
        />

        <v-text-field
          v-model="registerForm.password"
          label="密码"
          type="password"
          variant="outlined"
          :error="!!registerErrors.password"
          :error-messages="registerErrors.password"
          class="mb-4"
          clearable
        />

        <v-text-field
          v-model="registerForm.email"
          label="邮箱（选填）"
          type="email"
          variant="outlined"
          :error="!!registerErrors.email"
          :error-messages="registerErrors.email"
          class="mb-4"
          clearable
        />

        <v-text-field
          v-model="registerForm.phone"
          label="手机号（选填）"
          variant="outlined"
          class="mb-4"
          clearable
        />

        <v-btn
          color="primary"
          block
          size="large"
          @click="handleRegister"
          class="mb-6"
        >
          注册
        </v-btn>
      </div>

      <!-- 登录表单 -->
      <div v-else>
        <v-text-field
          v-model="loginForm.account"
          label="用户名"
          variant="outlined"
          :error="!!loginErrors.account"
          :error-messages="loginErrors.account"
          class="mb-4"
          clearable
        />

        <v-text-field
          v-model="loginForm.password"
          label="密码"
          type="password"
          variant="outlined"
          :error="!!loginErrors.password"
          :error-messages="loginErrors.password"
          class="mb-4"
          clearable
        />

        <div class="d-flex justify-end mb-4">
          <router-link
            to="/forgot-password"
            class="text-primary text-caption text-decoration-underline"
          >
            忘记密码？
          </router-link>
        </div>

        <v-btn
          color="primary"
          block
          size="large"
          @click="handleLogin"
          class="mb-6"
        >
          登录
        </v-btn>
      </div>
    </v-card-text>

    <!-- 切换链接区 -->
    <v-card-text class="text-center pt-0 pb-8">
      <div class="text-body-2 text-grey-darken-1">
        <template v-if="isLogin">
          没有账号？
          <a
            href="#"
            @click.prevent="toggle"
            class="text-primary font-weight-medium"
            >去注册</a
          >
        </template>
        <template v-else>
          已有账号？
          <a
            href="#"
            @click.prevent="toggle"
            class="text-primary font-weight-medium"
            >去登录</a
          >
        </template>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { userApi } from "@/api";
import { setToken } from "@/utils/storage";

const router = useRouter();

// 控制当前模式：true=登录，false=注册
const isLogin = ref(true);

// ----------- 登录表单 -----------
const loginForm = reactive({
  account: "",
  password: "",
});

const loginErrors = ref<Partial<Record<keyof typeof loginForm, string>>>({});

const validateLogin = (): boolean => {
  loginErrors.value = {};
  if (!loginForm.account.trim()) loginErrors.value.account = "请输入用户名";
  if (!loginForm.password) loginErrors.value.password = "请输入密码";
  return Object.keys(loginErrors.value).length === 0;
};

const handleLogin = async () => {
  if (!validateLogin()) return;
  try {
    const data = await userApi.login(loginForm);
    if (!data || typeof data.token !== "string") {
      throw new Error("登录失败：认证令牌缺失");
    }
    setToken(data.token);
    router.push("/");
  } catch (err: any) {
    loginErrors.value.account = err.message || "登录失败";
  }
};

// ----------- 注册表单 -----------
const registerForm = reactive({
  username: "",
  password: "",
  email: "",
  phone: "",
});

const registerErrors = ref<Partial<Record<keyof typeof registerForm, string>>>(
  {}
);

const validateRegister = (): boolean => {
  registerErrors.value = {};
  const { username, password } = registerForm;

  if (!username || username.trim().length === 0) {
    registerErrors.value.username = "请输入用户名";
  } else if (username.trim().length < 3) {
    registerErrors.value.username = "用户名至少3个字符";
  }

  if (!password || password.length < 6) {
    registerErrors.value.password = "密码至少6位";
  }

  if (
    registerForm.email &&
    !/^[\w.-]+@[\w.-]+\.\w+$/.test(registerForm.email)
  ) {
    registerErrors.value.email = "邮箱格式不正确";
  }

  return Object.keys(registerErrors.value).length === 0;
};

const handleRegister = async () => {
  if (!validateRegister()) return;
  try {
    await userApi.register({
      username: registerForm.username.trim(),
      password: registerForm.password,
      email: registerForm.email || undefined,
      phone: registerForm.phone || undefined,
    });

    // 注册成功，自动切换到登录
    isLogin.value = true;
    // 可选：弹出提示
    loginErrors.value.account = undefined;
    loginForm.account = registerForm.username;
    loginForm.password = "";
  } catch (err: any) {
    registerErrors.value.username = err.message || "注册失败";
  }
};

// ----------- 切换登录/注册 -----------
const toggle = () => {
  isLogin.value = !isLogin.value;
};
</script>

<style scoped>
/* 可选：添加淡入动画 */
v-card {
  transition: all 0.3s ease;
}
</style>
