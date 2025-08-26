import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import BlankLayout from '@/layouts/BlankLayout.vue';

// 异步加载页面
const Home = () => import('@/pages/Home.vue');
const Login = () => import('@/pages/auth/Login.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        { path: '', name: 'Home', component: Home },
      ],
    },
    {
      path: '/auth',
      component: BlankLayout,
      children: [
        { path: 'login', name: 'Login', component: Login },
      ],
    },
    // 可选：未匹配路由重定向
    // { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
});

// 为 axios 注入 router（以便在拦截器中跳转）
import { setRouterForAxios } from '@/api/client';
setRouterForAxios(router);

export default router;
