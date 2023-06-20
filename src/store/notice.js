import { defineStore } from "pinia";
import axios from 'axios';
import { useAuthStore } from "./auth";
import dayjs from 'dayjs';

let token = useAuthStore().token;

async function requestList(noticeNumber) {
    try {
        const response = await axios.get('http://localhost:8080/notice/list/' + noticeNumber);

        return response.data;

    } catch (error) {

        return '';
    }

}


async function requestDetail(noticeNumber) {
    try {
        const response = await axios.get('http://localhost:8080/notice/detail/' + noticeNumber);

        return response.data;

    } catch (error) {

        return '';
    }

}


async function requestRegister(title, content, noticeType) {
    try {
        const response = await axios.post('http://localhost:8080/notice/register', {
            title: title,
            content: content,
            noticeType: noticeType
        }, {
            headers: {
                admin_auth_token: token
            }
        });

        return response.data;

    } catch (error) {

        return '';
    }

}


async function requestModify(noticeNumber, title, content, noticeType) {
    try {
        const response = await axios.post('http://localhost:8080/notice/modify/' + noticeNumber, {
            title: title,
            content: content,
            noticeType: noticeType
        }, {
            headers: {
                admin_auth_token: token
            }
        });

        return response.data;

    } catch (error) {

        return '';
    }

}

async function requestDelete(noticeNumber) {
    try {
        const response = await axios.get('http://localhost:8080/notice/delete/' + noticeNumber, {
            headers: {
                admin_auth_token: token
            }
        });

        return response.data;

    } catch (error) {

        return '';
    }

}


export const useNoticeStore = defineStore("notice", {


    state: () => ({
        notice: Object,
        notices: [],
        lastLoadedId: 0,
    }),

    getters: {

    },

    actions: {

        async getNoticeDetail(id) {
            this.notice = '';

            let data = await requestDetail(id);
            this.notice = data;
        },


        async infiniteHandler($state) {
            if (this.lastLoadedId === 1) {
                return;
            }

            let data = await requestList(this.lastLoadedId);


            if (this.lastLoadedId != 1) {

                data.forEach(element => {
                    this.notices.push(element);
                    this.lastLoadedId = element.id;
                });

                $state.loaded();
            } else {

            }

        },

        formatDate(dateString) {
            const date = dayjs(dateString);

            return date.format('YYYY.MM.DD HH:mm');
        },

        getNoticeTypeClass(noticeType) {
            switch (noticeType) {
                case '업데이트':
                    return 'success';
                case '점검예정':
                    return 'warning';
                case '오류수정':
                    return 'error';
            }
        },

    }
});