<template>
  <v-container is-fluid>
    <v-sheet width="1000" class="mx-auto mt-10">

      <div>
        <v-chip variant="outlined">
          {{ communityStore.post.writer }}
        </v-chip>
        <h2 class="text-h5 font-weight-black mt-2">{{ communityStore.post.title }}</h2>

        <div class="text-h font-weight-medium mt-2"> {{
            communityStore.formatDate(communityStore.post.createdDate) }}
        </div>

        <QuillEditor v-model:content="communityStore.post.content" theme="bubble" readOnly="true"/>
      </div>
    </v-sheet>
  </v-container>

</template>

<script>

import { useCommunityStore } from '@/store/community.js'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.bubble.css';


export default {

  components: {
      QuillEditor
  },


  setup() {
        const communityStore = useCommunityStore();

        return {
            communityStore,
        }
    },


    created() {
      this.communityStore.loadPost(this.postId);
    },


  props: {
      postId: Number
    }

}
</script>

