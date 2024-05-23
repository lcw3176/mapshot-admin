import { defineStore } from "pinia";
import axios from 'axios';
import { useAuthStore } from "./auth";

let token = useAuthStore().token;



async function requestUpdateNewsLetter() {
    try {
        await axios.get('https://api.kmapshot.com/admin/news/update', {
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


export const useNewsStore = defineStore("news", {


    state: () => ({

    }),

    getters: {

    },

    actions: {

        async updateNewsLetter() {
            let result = await requestUpdateNewsLetter();

            if(result){
                alert("성공");
            }
        },


    }
});
