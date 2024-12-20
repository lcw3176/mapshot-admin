import { defineStore } from "pinia";
import axios from 'axios';
import dayjs from 'dayjs';

const apiUrl = process.env.VUE_APP_API_URL;

async function requestList(pageNumber) {
    try {
        const response = await axios.get(apiUrl + '/post?page=' + pageNumber);

        return response.data;

    } catch (error) {

        return '';
    }

}


async function requestDetail(postId) {
    try {
        const response = await axios.get(apiUrl + '/post/' + postId);

        return response.data;

    } catch (error) {

        return '';
    }

}


async function requestDelete(postId) {
    try {
        await axios.get(apiUrl + '/admin/post/delete/' + postId, {
            withCredentials: true
        });
        return true;

    } catch (error) {
        console.error(error);
        return false;
    }

}


export const useCommunityStore = defineStore("community", {


    state: () => ({
        post: '',
        posts: [],
        totalPage: '',
        nowPage: 1
    }),

    getters: {

    },

    actions: {

        async loadPost(id) {
            this.post = '';
            this.post = await requestDetail(id);

        },

        async loadPostList(pageNumber) {
            this.posts = [];
            let data = await requestList(pageNumber);

            this.totalPage = data.totalPage;
            this.posts = data.posts;

        },



        async delete(noticeNumber) {
            if (window.confirm("정말로 삭제하시겠습니까?")) {
                let result = await requestDelete(noticeNumber);

                if (result) {
                    alert("삭제 성공");
                } else {
                    alert("삭제 실패");
                }
            }
        },

        formatDate(dateString) {
            const date = dayjs(dateString);

            return date.format('YYYY.MM.DD HH:mm');
        },


    }
});
