<template>
    <v-container is-fluid>

      <v-row>
        <v-col>

        </v-col>

        <v-col cols="10">
          <v-table class="text-body-1">
            <thead>
            <tr>
              <th class="text-left">
                No
              </th>
              <th class="text-left">
                작성자
              </th>

              <th class="text-left">
                제목
              </th>

              <th class="text-left">
                삭제
              </th>

              <th class="text-left">
                작성일
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="post in communityStore.posts" :key="post.id">

              <td>{{ post.id }}</td>
              <td>
                <v-chip variant="outlined">
                  {{ post.writer }}
                </v-chip>
              </td>
              <td>
                <v-list-item :to="{ path: `/post/${post.id}` }">
                  {{ post.title }}
                </v-list-item>
              </td>


              <td>
                <v-btn color="error" @click="communityStore.delete(post.id)">
                  삭제하기
                </v-btn>
              </td>
              <td>{{ communityStore.formatDate(post.createdDate) }}</td>
            </tr>
            </tbody>
          </v-table>

          <v-pagination v-model="communityStore.nowPage" @click="communityStore.loadPostList(communityStore.nowPage)" :length="communityStore.totalPage"></v-pagination>

        </v-col>

        <v-col>

        </v-col>
      </v-row>


    </v-container>
</template>


<script>

import { useCommunityStore } from '@/store/community.js'

export default {

    setup() {
        const communityStore = useCommunityStore();

        communityStore.loadPostList(1);

        return {
            communityStore,
        }

    },

}
</script>

