<template>
<v-card class="px-0 py-0">
    <v-toolbar dense elevation="1">
        <v-toolbar-title class="primary--text">Jogador</v-toolbar-title>
        <v-divider class="mx-4" vertical></v-divider>
        <v-spacer></v-spacer>
        <v-divider class="mx-4" vertical></v-divider>
        <v-toolbar-items>
            <v-btn text @click="player={};dialogCadastro=true" color="primary">
                Novo
                <v-icon color="primary">mdi-plus</v-icon>
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
    <div class="col-12">
    <div class="col-12 d-md-flex">
        <v-text-field v-model="search" append-icon="mdi-magnify" class="ml-1 mr-1 col-12" label="Buscar" single-line hide-details></v-text-field>
    </div>
    <v-data-table class="col-12" :headers="headers" :items="players" :search="search" :loading="loading">
        <template v-slot:[`item.sexo`]="{ item }">
            <v-icon :color="item.sexo == 'Feminino' ? 'pink' : 'blue'">
                {{item.sexo == 'Feminino' ? 'mdi-gender-female' : 'mdi-gender-male'}}
            </v-icon>
            {{ item.sexo }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-row>
                <v-btn class="mx-2" fab x-small @click="player={...item}; dialogCadastro=true">
                    <v-icon color="primary">mdi-pencil</v-icon>
                </v-btn>
                <v-btn class="mx-2" fab x-small @click="excluir(item)">
                    <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
            </v-row>
        </template>
    </v-data-table>
    </div>
    <v-dialog v-model="dialogCadastro" width="400px">
        <v-card class="pa-4">
            <v-form
                class="col s12 col-md-12" ref="form">
                <h2 class="text-center primary--text" v-if="player.jogadorId==undefined">Cadastro do Novo Jogador</h2>
                <h2 class="text-center primary--text" v-else>Edição do Jogador</h2>
                <v-text-field
                    label="Nome do Jogador"
                    v-model="player.nome"
                />
                <v-select
                    :append-outer-icon="player.sexo == 'Feminino' ? 'mdi-gender-female' : 'mdi-gender-male'"
                    :color="player.sexo == 'Feminino' ? 'pink' : 'blue'"
                    v-model="player.sexo"
                    :items="sexo"
                    label="Sexo do Jogador"
                />
                <v-container>
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-btn @click="dialogCadastro = false" class="mr-4">
                            Cancelar
                        </v-btn>
                        <v-btn @click="adicionar()" class="primary--text" v-if="player.jogadorId==undefined">
                            Adicionar
                        </v-btn>
                        <v-btn @click="atualizar(player)" class="primary--text" v-else>
                            Atualizar
                        </v-btn>
                    </v-row>
                </v-container>
            </v-form>
        </v-card>
    </v-dialog>
</v-card>
</template>

<script>
    import axios from "axios";
export default {
    mounted() {
        this.load()
    },
    data() {
        return {
            search: "",
            dialogCadastro: false,
            loading: true,
            sexo: ['Feminino', 'Masculino'],
            headers: [
                {
                    text: "ID",
                    align: "start",
                    value: "jogadorId",
                    width: "5%"
                },
                {
                    text: "Nome",
                    value: "nome",
                    width: "40%"
                },
                {
                    text: "Sexo",
                    align: "center",
                    value: "sexo",
                    width: "35%"
                },
                {
                    text: "#",
                    value: "actions",
                    align: "center",
                    width: "10%"
                },
            ],
            desafioNovo: {jogadorId: 1, nome: 'Player Novo', sexo: 'Masculino', desafios: 'Ambos'},
            players: [],
            player: {},
        };
    },
    methods: {
        load() {
            this.loading = true
            let apiURL = 'http://localhost:4000/api/players/get'
            axios.get(apiURL).then(res => {
                this.loading = false
                this.players = res.data
            }).catch(error => {
                console.log(error)
            });
        },
        adicionar() {
            let id = 0
            this.players.forEach(element => {
                if(element.jogadorId > id){id = element.jogadorId}
            });
            this.player.jogadorId = id+1
            let apiURL = 'http://localhost:4000/api/players/create'
            axios.post(apiURL, this.player).then(() => {
                this.load()
                this.dialogCadastro=false
            }).catch(error => {
                console.log(error)
            });
        },
        excluir(jogador){
            let apiURL = `http://localhost:4000/api/players/delete/${jogador._id}`;
            if (window.confirm("Deseja realmente excluir?")) {
                axios.delete(apiURL).then(() => {
                    this.load()
                }).catch(error => {
                    console.log(error)
                });
            }
        },
        atualizar(jogador) {
            let apiURL = `http://localhost:4000/api/players/update/${jogador._id}`;
            axios.post(apiURL, jogador).then(() => {
                let player = this.players.find(elem => elem.id == jogador.id)
                player.nome = jogador.nome;
                player.sexo = jogador.sexo;
                this.dialogCadastro = false
            }).catch(error => {
                console.log(error)
            });
        }
    },
};
</script>
