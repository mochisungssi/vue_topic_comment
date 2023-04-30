import { createWebHistory, createRouter } from "vue-router";

//components
import Home from '../view/HomeView'
import Index from '../view/IndexView'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    }
    ,
    {
        path: '/index',
        name: 'Index',
        component: Index
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router