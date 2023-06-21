import { defineStore } from "pinia";
import axios from 'axios';
import router from "@/router";

async function requestLogin(nickname, password) {
  try {
    const response = await axios.post('http://localhost:8080/admin/login', {
      nickname: nickname,
      password: password
    });

    return response;

  } catch (error) {

    return '';
  }

}

async function requestRefresh(token) {
  try {
    const response = await axios.post('http://localhost:8080/admin/auth/refresh', {}, {
      headers: {
        admin_auth_token: token
      }
    });

    return response;

  } catch (error) {

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