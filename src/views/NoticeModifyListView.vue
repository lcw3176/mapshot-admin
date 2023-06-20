<template>
    <v-container is-fluid>


        <v-row>
            <v-col>
                <v-table>
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
                            <td><v-list-item :to="{ path: `/notice/modify/${notice.id}` }"> {{ notice.title }}</v-list-item>
                            </td>
                            <td>{{ noticeStore.formatDate(notice.createdDate) }}</td>
                        </tr>
                    </tbody>
                </v-table>

            </v-col>

        </v-row>
    </v-container>

    <InfiniteLoading @infinite="noticeStore.infiniteHandler">

    </InfiniteLoading>
</template>


<script>

import { useNoticeStore } from '@/store/notice.js'
import InfiniteLoading from 'v3-infinite-loading'

export default {

    components: {
        InfiniteLoading,
    },

    setup() {
        const noticeStore = useNoticeStore();

        return {
            noticeStore,
        }

    },

    data: () => ({
        notices: [],
        loadNum: 0,

    }),


    methods: {

    }

}
</script>

