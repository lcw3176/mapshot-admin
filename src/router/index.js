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
    path: '/notice/modify/:noticeNumber',
    name: 'noticeModify',
    component: () => import(/* webpackChunkName: "noticeModify" */ '../views/NoticeModifyView.vue'),
    props: true
  },

  {
    path: '/notice/list',
    name: 'noticeList',
    component: () => import(/* webpackChunkName: "noticeList" */ '../views/NoticeListView.vue')
  },


  {
    path: '/notice/:noticeNumber',
    name: 'noticeDetail',
    component: () => import(/* webpackChunkName: "noticeDetail" */ '../views/NoticeView.vue'),
    props: true
  },

  {
    path: '/news-letter',
    name: 'newsLetter',
    component: () => import(/* webpackChunkName: "newsLetter" */ '../views/NewsLetterView.vue')
  },

  {
    path: '/post',
    name: 'postList',
    component: () => import(/* webpackChunkName: "postList" */ '../views/PostListView.vue')
  },

  {
    path: '/post/:postId',
    name: 'postDetail',
    component: () => import(/* webpackChunkName: "postDetail" */ '../views/PostView.vue'),
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
