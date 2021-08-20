import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router';

const routesCadastros: Array<RouteConfig> = [
    {
        path: '/Cadastros/jogadores',
        name: 'HomeJogador',
        component: () => import('@/views/cadastros/jogadores/HomeJogadores.vue'),
    },
    {
        path: '/Cadastros/desafios',
        name: 'HomeDesafio',
        component: () => import('@/views/cadastros/desafios/HomeDesafios.vue'),
    },
];

export default routesCadastros;
