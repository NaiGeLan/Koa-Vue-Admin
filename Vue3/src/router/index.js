import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        name:'home',
        path:'/',
        meta:{
            title:'首页'
        },
        component:() => import('../views/Home.vue'),
        children:[
            {
                name:'welcome',
                path:'/welcome',
                meta:{
                    title:'欢迎'
                },
                component:() => import('../components/welcome.vue')
            },
            {
                name:'user',
                path:'/user',
                meta:{
                    title:'用户管理'
                },
                component:() => import('../views/User.vue')
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
