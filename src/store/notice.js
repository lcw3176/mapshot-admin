import { defineStore } from "pinia";
import axios from 'axios';
import { useAuthStore } from "./auth";
import dayjs from 'dayjs';

let token = useAuthStore().token;

async function requestList(noticeNumber) {
    try {
        const response = await axios.get('https://api.kmapshot.com/notice/list/' + noticeNumber);

        return response.data;

    } catch (error) {

        return '';
    }

}


async function requestDetail(noticeNumber) {
    try {
        const response = await axios.get('https://api.kmapshot.com/notice/detail/' + noticeNumber);

        return response.data;

    } catch (error) {

        return '';
    }

}


async function requestRegister(notice) {
    try {
        const response = await axios.post('https://api.kmapshot.com/notice/register', {
            title: notice.title,
            content: notice.content,
            noticeType: notice.noticeType
        }, {
            headers: {
                admin_auth_token: token
            }
        });

        return true;

    } catch (error) {

        console.error(error);
        return false;
    }

}


async function requestModify(notice) {
    try {
        const response = await axios.post('https://api.kmapshot.com/notice/modify/' + notice.id, {
            title: notice.title,
            content: notice.content,
            noticeType: notice.noticeType
        }, {
            headers: {
                admin_auth_token: token
            }
        });

        return true

    } catch (error) {

        console.error(error);
        return false;
    }

}

async function requestDelete(noticeNumber) {
    try {
        const response = await axios.get('https://api.kmapshot.com/notice/delete/' + noticeNumber, {
            headers: {
                admin_auth_token: token
            }
        });

        return true;

    } catch (error) {
        console.error(error);
        return false;
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

        async init() {
            this.notices = [];
            this.lastLoadedId = 0;
            this.notice = '';
        },

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


        async register() {
            this.changeNoticeTypeToEng(this.notice);
            let result = await requestRegister(this.notice);

            if (result) {
                alert("등록 성공");
            } else {
                alert("등록 실패");
            }
        },


        async modify() {
            this.changeNoticeTypeToEng(this.notice);
            let result = await requestModify(this.notice);

            if (result) {
                alert("수정 성공");
            } else {
                alert("수정 실패");
            }
        },

        async delete(noticeNumber) {
            if (window.confirm("정말로 삭제하시겠습니까?")) {
                let result = await requestDelete(noticeNumber);

                if (result) {
                    alert("삭제 성공");
                    this.init();
                } else {
                    alert("삭제 실패");
                }
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

        changeNoticeTypeToEng(notice) {
            switch (notice.noticeType) {
                case '업데이트':
                    notice.noticeType = "UPDATE";
                    break;
                case '점검예정':
                    notice.noticeType = "RESERVED_CHECK";
                    break;
                case '오류수정':
                    notice.noticeType = "FIX";
                    break;
            }
        }

    }
});