<template>
    <v-container is-fluid>
        <v-sheet width="1000" class="mx-auto mt-10">

            <div>
                <v-chip :color=noticeStore.getNoticeTypeClass(noticeStore.notice.noticeType) variant="outlined">
                    {{ noticeStore.notice.noticeType }}
                </v-chip>
                <h2 class="text-h5 font-weight-black mt-2">{{ noticeStore.notice.title }}</h2>

                <div class="text-h font-weight-medium mt-2"> {{
                    noticeStore.formatDate(noticeStore.notice.createdDate) }}
                </div>


                <QuillEditor v-model:content="noticeStore.notice.content" theme="bubble" readOnly="true" contentType="html"/>
            </div>
        </v-sheet>
    </v-container>

</template>


<script>

import { useNoticeStore } from '@/store/notice.js'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

export default {

    components: {
        QuillEditor
    },

    setup() {
        const noticeStore = useNoticeStore();

        return {
            noticeStore,
        }

    },

    created() {
        this.noticeStore.loadPost(this.noticeNumber);
    },


    data: () => ({
        notices: [],
        loadNum: 0,
        items: [
            '오류수정',
            '점검예정',
            '업데이트',
        ],
    }),


    methods: {

    },

    props: {
        noticeNumber: Number
    }

}
</script>

