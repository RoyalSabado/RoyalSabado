import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router';

const routesUsuarios: Array<RouteConfig> = [
    {
        path: '/usuarios/Cadastro',
        name: 'CadastroUsuario',
        component: () => import('@/views/usuarios/CadastroUsuario.vue'),
        children: [
            {
                path: ':id',
                name: "AlterarUsuario"
            }
        ]
    },
    {
        path: '/usuarios',
        name: 'Usuarios',
        component: () => import('@/views/usuarios/HomeUsuario.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/usuarios/LoginComponent.vue'),
    }
];

export default routesUsuarios;
