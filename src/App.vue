<template>
  <v-layout>
    <v-navigation-drawer class="bg-deep-purple" theme="dark" permanent v-if="display.mdAndUp && authStore.token !== ''">


      <v-list>
        <v-list-subheader>MAPSHOT-ADMIN</v-list-subheader>
        <v-list-item title="홈" to="/home"></v-list-item>

        <v-list-subheader>공지사항</v-list-subheader>
        <v-list-item v-for="(item, index) in notice" :key="index" :value="item.title" :title="item.title" :to="item.to"></v-list-item>

        <v-list-subheader>게시판</v-list-subheader>
        <v-list-item v-for="(item, index) in community" :key="index" :value="item.title" :title="item.title" :to="item.to"></v-list-item>

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

import { useDisplay } from 'vuetify'
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth.js'


export default {

  setup() {
    const authStore = useAuthStore();

    return {
      authStore,
    }
  },

  data() {
    const display = ref(useDisplay())

    return {
      appTitle: "MAPSHOT ADMIN",
      sidebar: false,
      display,
      notice: [
        {title: "목록", to: "/notice/confirm"},
        {title: "등록하기", to: "/notice/create"},

      ],

      community: [
        {title: "목록", to: "/contact/all"},
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
