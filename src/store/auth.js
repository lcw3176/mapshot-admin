import {defineStore} from "pinia";
import axios from 'axios';
import router from "@/router";

const apiUrl = process.env.VUE_APP_API_URL;

async function requestLogin(nickname, password) {
  try {
    return await axios.post(apiUrl + '/admin/user/login', {
      nickname: nickname,
      password: password
    }, { withCredentials:true });

  } catch (error) {
    console.log(error);
    return '';
  }

}

async function requestRefresh(token) {
  try {
    return await axios.post(apiUrl + '/admin/user/auth/refresh', {}, {
      headers: {
        admin_auth_token: token
      }
    }, { withCredentials:true });

  } catch (error) {
    console.log(error);
    return '';
  }

}


export const useAuthStore = defineStore("auth", {


  state: () => ({
    nickname: '',
    password: '',
    token: '',
    expirationTimer : '',
    tokenExpirationMinute: 0,

  }),

  getters: {

  },

  actions: {

    async startTimer(){

      this.expirationTimer = setInterval(() => {
        if (this.tokenExpirationMinute === 1) {
          this.tokenExpirationMinute = 0;
          clearInterval(this.expirationTimer)
        } else {
          this.tokenExpirationMinute--
        }
      }, 1000 * 60);

    },

    async login() {
      let data = await requestLogin(this.nickname, this.password);

      if (data.headers.admin_auth_token !== '' && data.headers.admin_auth_token !== undefined) {
        this.token = data.headers.admin_auth_token;
        router.push('/home');
        this.tokenExpirationMinute = 60;
        this.startTimer();
      }

    },


    async refreshAuth() {
      let data = await requestRefresh(this.token);

      if (data.headers.admin_auth_token !== '' && data.headers.admin_auth_token !== undefined) {
        this.token = data.headers.admin_auth_token;
        this.tokenExpirationMinute = 60;
      }

    },
  }
});
