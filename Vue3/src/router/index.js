import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        name:'welcome',
        path:'/',
        meta:{
            title:'欢迎'
        },
        component:() => import('../views/Home.vue')
    },
    {
        name:'login',
        path:'/login',
        meta:{
            title:'登陆'
        },
        component:() => import('../views/Login.vue')
    },

]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
