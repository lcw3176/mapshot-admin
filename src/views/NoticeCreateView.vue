<template>
    <v-container is-fluid>
        <v-sheet width="1000" class="mx-auto mt-10">

            <v-form ref="form">
                <v-text-field v-model="noticeStore.notice.title" variant="underlined" label="제목" required></v-text-field>

                <v-select v-model="noticeStore.notice.noticeType" :items="items" variant="underlined" label="카테고리" required></v-select>

                <QuillEditor v-model:content="noticeStore.notice.content" theme="snow" contentType="html" style="height: 500px;" />

                <v-btn class="me-4 mt-5" color="success" @click="noticeStore.register()">
                    등록하기
                </v-btn>
            </v-form>
        </v-sheet>
    </v-container>
</template>


<script>

import { useNoticeStore } from '@/store/notice.js'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {

    components: {
        QuillEditor
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

