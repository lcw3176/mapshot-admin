import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia"


// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


import axios from 'axios';


const vuetify = createVuetify({
    components,
    directives,
})


axios.interceptors.response.use(
    response => response,
    error => {

        if (error.response && (error.response.status < 200 || error.response.status >= 300) ) {
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

createApp(App).use(createPinia()).use(router).use(vuetify).mount('#app')
