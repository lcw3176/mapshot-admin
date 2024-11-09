<template>
  <v-layout>
    <v-navigation-drawer class="bg-deep-purple" theme="dark" permanent v-if="authStore.token !== undefined">


      <v-list>

        <v-list-subheader>MAPSHOT-ADMIN</v-list-subheader>
        <v-divider></v-divider>
        <v-list-item v-for="(item, index) in home" :key="'home' + index" :title="item.title" :to="item.to"></v-list-item>
        <v-divider></v-divider>
        <v-list-subheader>공지사항</v-list-subheader>
        <v-list-item v-for="(item, index) in notice" :key="'notice' + index" :title="item.title" :to="item.to"></v-list-item>
        <v-divider></v-divider>
        <v-list-subheader>커뮤니티</v-list-subheader>
        <v-list-item v-for="(item, index) in community" :key="'community' + index" :title="item.title" :to="item.to"></v-list-item>
        <v-divider></v-divider>
        <v-list-subheader>뉴스레터</v-list-subheader>
        <v-list-item v-for="(item, index) in news_letter" :key="'news_letter' + index" :title="item.title" :to="item.to"></v-list-item>

      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="authStore.refreshAuth()">
            {{ getTimer() }} 로그인 연장
          </v-btn>
        </div>
      </template>


    </v-navigation-drawer>


    <v-main>
      <router-view></router-view>
    </v-main>

  </v-layout>
</template>

<script>

import { useAuthStore } from '@/store/auth.js'


export default {

  setup() {
    const authStore = useAuthStore();

    return {
      authStore,
    }
  },

  data() {

    return {
      home: [
        {title: "홈", to: "/home"},
      ],

      notice: [
        {title: "목록", to: "/notice/list"},
        {title: "등록", to: "/notice/create"},
      ],

      community: [
        {title: "목록", to: "/post"},
      ],

      news_letter: [
        {title: "강제 갱신", to: "/news-letter"},
      ]

    };
  },


  methods: {
    getTimer(){
        const hour = Math.floor(this.authStore.tokenExpirationMinute / 60) >= 10 ?
        Math.floor(this.authStore.tokenExpirationMinute / 60)
        : "0" + Math.floor(this.authStore.tokenExpirationMinute / 60)
        const minutes = Math.floor(this.authStore.tokenExpirationMinute % 60 / 10).toString()
        + Math.floor(this.authStore.tokenExpirationMinute % 60 % 10).toString()

        return `${hour}:${minutes}`
    }
  }
}
</script>
