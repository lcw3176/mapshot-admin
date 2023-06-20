<template>
    <v-container is-fluid>
        <v-sheet width="1000" class="mx-auto mt-10">

            <v-form ref="form">
                <v-text-field v-model="title" variant="underlined" label="제목" required></v-text-field>

                <v-select v-model="select" :items="items" variant="underlined" label="카테고리" required></v-select>
                
                <v-textarea v-model="content" variant="outlined" label="내용" rows="15" required></v-textarea>

                <v-btn class="me-4" color="success">
                    등록하기
                </v-btn>
            </v-form>
        </v-sheet>
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

    data: () => ({
        title: '',
        content: '',
        select: null,
        items: [
            '오류수정',
            '점검예정',
            '업데이트',
        ],
    }),  


    methods: {

    }

}
</script>

