<template>
    <v-container is-fluid>
      <v-btn @click="newsStore.updateNewsLetter()">
        뉴스레터 갱신
      </v-btn>

    </v-container>

</template>


<script>

import { useNewsStore } from '@/store/news.js'

export default {


    setup() {
        const newsStore = useNewsStore();

        return {
          newsStore,
        }

    },

}
</script>

