import { defineStore } from "pinia";
import axios from 'axios';
import dayjs from 'dayjs';

const apiUrl = process.env.VUE_APP_API_URL;


async function requestList(pageNumber) {
    try {
        const response = await axios.get(apiUrl + '/notice?page=' + pageNumber);

        return response.data;

    } catch (error) {

        return '';
    }

}


async function requestDetail(noticeNumber) {
    try {
        const response = await axios.get(apiUrl + '/notice/' + noticeNumber);

        return response.data;

    } catch (error) {

        return '';
    }

}


async function requestRegister(notice) {
    try {
        await axios.post(apiUrl + '/admin/notice/register', {
            title: notice.title,
            content: notice.content,
            noticeType: notice.noticeType
        }, {
            withCredentials: true
        });
        return true;

    } catch (error) {

        console.error(error);
        return false;
    }

}


async function requestModify(notice) {
    try {
        await axios.post(apiUrl + '/admin/notice/modify/' + notice.id, {
            title: notice.title,
            content: notice.content,
            noticeType: notice.noticeType
        }, {
            withCredentials: true
        });
        return true

    } catch (error) {

        console.error(error);
        return false;
    }

}

async function requestDelete(noticeNumber) {
    try {
        await axios.get(apiUrl + '/admin/notice/delete/' + noticeNumber, {
            withCredentials: true
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
    }),

    getters: {

    },

    actions: {

        async init() {
            this.notices = '';
            this.notice = '';
        },

        async loadPost(id) {

            this.notice = '';
            this.notice = await requestDetail(id);

        },

        async loadPostList(id) {

            this.notices = '';
            let data = await requestList(id);

            this.totalPage = data.totalPage;
            this.notices = data.notices;

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
                    await this.init();
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
