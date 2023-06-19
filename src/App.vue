<template>
  <v-layout>
    <v-navigation-drawer class="bg-deep-purple" theme="dark" permanent v-if="display.mdAndUp && authStore.token !== ''">


      <v-list v-model:opened="open">
        <v-list-subheader>MAPSHOT-ADMIN</v-list-subheader>
        <v-list-item title="홈" to="/home"></v-list-item>

        <v-list-group value="공지사항">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="공지사항"></v-list-item>
          </template>

          <v-list-item v-for="item in notice" :key="item.title" :value="item.title" :title="item.title" :to="item.to"></v-list-item>
        </v-list-group>


        <v-list-group value="문의">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="문의"></v-list-item>
          </template>

          <v-list-item v-for="item in contact" :key="item.title" :value="item.title" :title="item.title" :to="item.to"></v-list-item>
        </v-list-group>

      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block>
            로그인 연장
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
        {title: "등록", to: "/notice/create"},
        {title: "수정", to: "/notice/modify"},
        {title: "삭제", to: "/notice/delete"},
      ],

      contact: [
        {title: "목록", to: "/contact/all"},
        {title: "미완료", to: "/contact/incomplete"},
        {title: "완료", to: "/contact/complete"},
      ],

      open: [],
    };
  },
}
</script>
