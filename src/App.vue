<template>
  <v-layout>
    <v-app-bar elevation="1" v-if="display.mdAndUp && authStore.token !== ''">
      <v-btn class="font-weight-black font-weight-bold text-h5" to="/">
        {{ appTitle }}

      </v-btn>

      <v-btn v-for="item in desktop" :key="item.title" size="large" variant="plain" :to="item.path">

        {{ item.title }}

      </v-btn>

    </v-app-bar>

    <v-bottom-navigation v-if="!display.mdAndUp && authStore.token !== ''" grow>
      <v-btn v-for="item in mobile" :key="item.title" color="teal" :to="item.path">
        <v-icon>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
    </v-bottom-navigation>


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
      desktop: [
        { title: "공지사항", path: "/notice" },
        { title: "유저 문의", path: "/contact" },
      ],


      mobile: [
        { title: "홈", path: "/", icon: "mdi-home-outline" },
        { title: "공지사항", path: "/manual", icon: "mdi-bullhorn-outline" },
        { title: "유저 문의", path: "/notice", icon: "mdi-tooltip-question-outline" }
      ],
      display
    };
  },
}
</script>
