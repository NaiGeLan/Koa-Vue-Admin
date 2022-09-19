// import {createStore} from "vuex";
// import mutations from './mutations.js'
// import storage from "../utils/storage.js";
// const state = {
//     userInfo: "" || storage.getItem("userInfo")
// }
// export default createStore({
//     state,
//     mutations
// })
// const store = createPinia()

// export default store

import { defineStore } from 'pinia'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore('main', {
  // other options...
})