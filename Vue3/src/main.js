import { createApp } from 'vue'
// import './style.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
// import storage from "./utils/storage.js";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'uno.css'
// import store from "./store";
const app = createApp(App)
// app.config.globalProperties.$storage = storage
app.use(router).use(ElementPlus).use(createPinia()).mount('#app')
