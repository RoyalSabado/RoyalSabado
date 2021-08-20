import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import PageNotFound from '../views/NotFound.vue';
import routesCadastros from '@/views/cadastros/routes';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    ...routesCadastros,
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    { path: "*", component: PageNotFound  }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
