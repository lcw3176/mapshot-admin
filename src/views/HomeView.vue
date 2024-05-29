<template>
    <v-container is-fluid>
      <v-card width="800" prepend-icon="mdi-home">
        <template v-slot:title>
          접속자 통계
        </template>

        <v-card-text>
          <v-img width="800" aspect-ratio="16/9" cover
                 src="https://hits.seeyoufarm.com/api/count/graph/dailyhits.svg?url=https://kmapshot.com" />

        </v-card-text>
        <v-card-text>
          <v-img width="100" aspect-ratio="16/9" cover
                 src="https://hits.seeyoufarm.com/api/count/keep/badge.svg?url=https%3A%2F%2Fkmapshot.com&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false" />
        </v-card-text>

      </v-card>
    </v-container>
</template>


<script>

import { useAuthStore } from '@/store/auth.js'

export default {

    components: {

    },

    setup() {
        const authStore = useAuthStore();

        return {
            authStore,
        }

    },

}
</script>

