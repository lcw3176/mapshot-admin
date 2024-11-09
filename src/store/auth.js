import {defineStore} from "pinia";
import axios from 'axios';
import router from "@/router";
import Cookies from 'js-cookie';


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

async function requestRefresh() {
  try {
    return await axios.post(apiUrl + '/admin/user/auth/refresh', {}, { withCredentials:true });

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

      if (data.status === 200) {
        this.token = Cookies.get('ADMIN_AUTH_TOKEN');
        await router.push('/home');
        this.tokenExpirationMinute = 60;
        await this.startTimer();
      }

    },


    async refreshAuth() {
      let data = await requestRefresh(this.token);

      if (data.status === 200) {
        this.token = Cookies.get('ADMIN_AUTH_TOKEN');
        this.tokenExpirationMinute = 60;
      }

    },
  }
});
