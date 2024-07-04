import { createApp } from 'vue'
import App from './App.vue'
import  store from './store/store.js'
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

import ElementPlus from "element-plus";

import router from './router'




const app = createApp(App);
app.config.globalProperties.$ = $;
app.use(router)
app.use(ElementPlus)
app.use(store)

app.mount('#app')