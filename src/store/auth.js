import { defineStore } from "pinia";
import axios from 'axios';
import router from "@/router";

async function requestLogin(nickname, password) {
  try{
    const response = await axios.post('http://localhost:8080/admin/login', {
      nickname: nickname,
      password: password
    });

    return response;

  } catch(error){

    return '';
  }
  
}


export const useAuthStore = defineStore("auth", {


  state: () => ({
    nickname: '',
    password: '',
    token: '',
  }),

  getters: {

  },

  actions: {
    async login() {
      let data = await requestLogin(this.nickname, this.password);

      if(data.headers.admin_auth_token !== '' && data.headers.admin_auth_token !== undefined){
        this.token = data.headers.admin_auth_token;
        router.push('/home');
      }
      
    },
  }
});