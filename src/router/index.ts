import { createRouter, createWebHistory } from 'vue-router'

// 布局组件
const DefaultLayout = () => import('@/layouts/DefaultLayout.vue')
const AuthLayout = () => import('@/layouts/AuthLayout.vue')

// 页面组件
const HomeView = () => import('@/views/HomeView.vue')
const LoginView = () => import('@/views/LoginView.vue')
const OrderListView = () => import('@/views/OrderListView.vue')

// 路由配置
const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'Home', component: HomeView },
      { path: '/orders', name: 'OrderList', component: OrderListView },
    ],
  },
  {
    path: '/login',
    component: AuthLayout,
    children: [{ path: '', name: 'Login', component: LoginView }],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
