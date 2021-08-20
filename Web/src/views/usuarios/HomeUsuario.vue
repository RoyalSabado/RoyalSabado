<template>
<v-card class="px-0 py-0">
    <v-toolbar dense elevation="1">
        <v-toolbar-title class="primary--text">Usuários</v-toolbar-title>
        <v-divider class="mx-4" vertical></v-divider>
        <v-spacer></v-spacer>
        <v-divider  v-if="perfil=='Administrador'" class="mx-4" vertical></v-divider>
        <v-toolbar-items right v-if="perfil=='Administrador'">
            <v-btn text @click="$router.push({ name: 'CadastroUsuario' })">
                Novo
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
    <div class="col-12">
    <div class="col-12 d-md-flex">
        <v-text-field v-model="search" append-icon="mdi-magnify" class="ml-1 mr-1 col-sm-12 col-md-7" label="Buscar" single-line hide-details></v-text-field>
        <v-radio-group v-model="showActives" row class="col-sm-12 col-md-4">
            <v-radio label="Ativos" value="Ativo" color="primary"></v-radio>
            <v-radio label="Inativos" value="Inativo" color="primary"></v-radio>
            <v-radio label="Todos" value="Todos" color="primary"></v-radio>
        </v-radio-group>
    </div>
    <v-data-table class="col-12" :headers="headers" :items="usuarios" :search="search">
        <template v-slot:[`item.laboratorioId`]="{ item }">
            <div v-if="item.laboratorioId != null">
                <v-tooltip left color="#222">
                    <template v-slot:activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on">
                            {{laboratorios.find(elem => elem.laboratorioId == item.laboratorioId).sigla}}
                        </span>
                    </template>
                    <span>{{laboratorios.find(elem => elem.laboratorioId == item.laboratorioId).descricao}}</span>
                </v-tooltip> 
            </div>
            <span v-else>N/A</span>
        </template>
        <template v-if="perfil=='Administrador'" v-slot:[`item.acoes`]="{ item }">
            <v-btn class="mx-2" fab x-small @click="editar(item.usuarioId)">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </template>
        <template v-slot:[`item.usuarioId`]="{item}">
            {{UsuarioMascara(item.usuarioId)}}
        </template>
    </v-data-table>
    </div>
</v-card>
</template>

<script>
import api from "@/api/api.js";
import { mapState } from 'vuex'

export default {
    mounted() {
        api.listar("Laboratorios").then(response => {
            this.laboratorios = response.data;
            api.listar("usuarios").then(response => {
                this.listUsuarios = response.data;
                this.showActives = "Ativo";
            });
        });
        this.perfil = localStorage.userVerComo
        // Configuração do Header!
        if(this.perfil == 'Administrador'){
            this.headers.push(
                {
                    text: '#',
                    align: "center",
                    value: 'acoes',
                    sortable: false,
                }
        )}
    },
    data() {
        return {
            perfil: "",
            search: "",
            showActives: "",
            headers: [{
                    text: "Usuário",
                    align: "start",
                    value: "usuarioId"
                },
                {
                    text: "Nome",
                    value: "nome"
                },
                {
                    text: "Departamento",
                    align: "center",
                    value: "departamento"
                },
                {
                    text: "E-Mail",
                    value: "email"
                },
                {
                    text: "Perfil",
                    align: "center",
                    value: "perfil"
                },
                {
                    text: "Situação",
                    align: "center",
                    value: "situacao"
                },
                {
                    text: "Laboratório",
                    align: "center",
                    value: "laboratorioId"
                }
            ],
            usuarios: [],
            listUsuarios: [],
            laboratorios: [],
        };
    },
    methods: {
        UsuarioMascara(valor) {
            let id = valor.toString()
            let v = "CAL"
            v= v + id.padStart(5,"0")
            return v

        },
        deletar(item) {
            const dados = this.usuarios.find(element => element.usuarioId == item);
            const index = this.usuarios.indexOf(dados);
            if (confirm(`Deseja realmente deletar ${item}`)) {
                api.deletar("usuarios", dados.usuarioId).then(() => {
                    this.usuarios.splice(index, 1);
                });
            }
        },
        editar(item) {
            this.$router.push({
                name: "AlterarUsuario",
                params: {
                    id: item
                }
            });
        }
    },
    computed:{
        ... mapState({
            perfilWatch: state => state.userVerComo,
        }),
    },
    watch: {
        showActives(n) {
            if (n == "Todos") {
                this.usuarios = this.listUsuarios;
            } else {
                this.usuarios = this.listUsuarios.filter(u => u.situacao == n);
            }
        },
        perfilWatch(novo) {
            this.perfil = novo
        },
    },
};
</script>
