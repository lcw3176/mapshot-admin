<template>
  <v-layout>
    <v-navigation-drawer class="bg-deep-purple" theme="dark" permanent v-if="authStore.token !== ''">


      <v-list density="compact">
        <v-list-subheader>MAPSHOT-ADMIN</v-list-subheader>
        <v-list-item v-for="(item, index) in menu" :key="index" :value="item.title" :title="item.title" :to="item.to"></v-list-item>
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
      menu: [
        {title: "홈", to: "/home"},
        {title: "공지사항 목록", to: "/notice/confirm"},
        {title: "공지사항 등록", to: "/notice/create"},
        {title: "게시글 목록", to: "/community"},

      ],

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
