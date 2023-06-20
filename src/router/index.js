import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },

  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue')
  },

  {
    path: '/notice/create',
    name: 'noticeCreate',
    component: () => import(/* webpackChunkName: "noticeCreate" */ '../views/NoticeCreateView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {

  if (to.path !== "/login" && useAuthStore().token === '') {
      next("/login");
  } else {
      next();
  }
});

export default router
