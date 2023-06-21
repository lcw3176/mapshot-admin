<template>
    <v-container is-fluid>
        <v-sheet width="1000" class="mx-auto mt-10">

            <v-form ref="form">
                <v-text-field v-model="noticeStore.notice.title" variant="underlined" label="제목" required></v-text-field>

                <v-select v-model="noticeStore.notice.noticeType" :items="items" variant="underlined" label="카테고리" required></v-select>

                <v-textarea v-model="noticeStore.notice.content" variant="outlined" label="내용" rows="15" required></v-textarea>

                <v-btn class="me-4" color="success" @click="noticeStore.register()">
                    등록하기
                </v-btn>
            </v-form>
        </v-sheet>
    </v-container>
</template>


<script>

import { useNoticeStore } from '@/store/notice.js'

export default {

    components: {

    },

    setup() {
        const noticeStore = useNoticeStore();
        noticeStore.notice = {
            title: '',
            content: '',
            noticeType: '',
        };

        return {
            noticeStore,
        }

    },

    data: () => ({
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

