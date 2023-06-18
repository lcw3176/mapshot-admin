import { defineStore } from "pinia";
import axios from 'axios';

async function requestLogin(queryString) {
  try{
    const response = await axios.get('http://localhost:8080/' + queryString);

    return response.data;
  } catch(error){

    return [];
  }
  
}


export const useAuthStore = defineStore("auth", {

  state: () => ({
   
  }),


  getters: {

  },

  actions: {
    async login() {

    },
  }
});