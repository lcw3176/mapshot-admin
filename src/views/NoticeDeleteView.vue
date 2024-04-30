<template>
    <v-container is-fluid>

        <v-row>
          <v-col>

          </v-col>

          <v-col cols="8">
            <v-table class="text-body-1">
              <thead>
              <tr>
                <th class="text-left">
                  No
                </th>
                <th class="text-left">
                  카테고리
                </th>

                <th class="text-left">
                  제목
                </th>

                <th class="text-left">
                  작성일
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="notice in noticeStore.notices" :key="notice.id">

                <td>{{ notice.id }}</td>
                <td>
                  <v-chip :color=noticeStore.getNoticeTypeClass(notice.noticeType) variant="outlined">
                    {{ notice.noticeType }}
                  </v-chip>
                </td>
                <td><v-list-item @click="noticeStore.delete(notice.id)"> {{ notice.title }}</v-list-item>
                </td>
                <td>{{ noticeStore.formatDate(notice.createdDate) }}</td>
              </tr>
              </tbody>
            </v-table>

            <v-pagination v-model="noticeStore.nowPage" @click="noticeStore.loadPostList(noticeStore.nowPage)"  :length="noticeStore.totalPage"></v-pagination>

          </v-col>

          <v-col>

          </v-col>
        </v-row>


    </v-container>

</template>


<script>

import { useNoticeStore } from '@/store/notice.js'

export default {

    components: {

    },

    setup() {
        const noticeStore = useNoticeStore();

        noticeStore.init();

        return {
            noticeStore,
        }

    },



    methods: {

    }

}
</script>

