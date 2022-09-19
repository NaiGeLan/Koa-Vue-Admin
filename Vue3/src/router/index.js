import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        name:'home',
        path:'/',
        component:() => import('../components/Home.vue'),
        meta:{
            title:'首页'
        },
        children:[
            {
                name:'welcome',
                path:'/welcome',
                meta:{
                    title:'欢迎'
                },
                component:() => import('../components/Welcome.vue')
            },
        ]
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
