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

  {
    path: '/notice/modify',
    name: 'noticeModifyList',
    component: () => import(/* webpackChunkName: "noticeModifyList" */ '../views/NoticeModifyListView.vue')
  },

  {
    path: '/notice/modify/:noticeNumber',
    name: 'noticeModify',
    component: () => import(/* webpackChunkName: "noticeModify" */ '../views/NoticeModifyView.vue'),
    props: true
  },

  {
    path: '/notice/delete',
    name: 'noticeDelete',
    component: () => import(/* webpackChunkName: "noticeDelete" */ '../views/NoticeDeleteView.vue')
  },

  {
    path: '/notice/confirm',
    name: 'noticeConfirmList',
    component: () => import(/* webpackChunkName: "noticeConfirmList" */ '../views/NoticeConfirmListView.vue')
  },

  
  {
    path: '/notice/confirm/:noticeNumber',
    name: 'noticeConfirm',
    component: () => import(/* webpackChunkName: "noticeConfirm" */ '../views/NoticeConfirmView.vue'),
    props: true
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
