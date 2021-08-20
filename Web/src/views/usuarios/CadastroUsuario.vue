<template>
<div>
    <v-card class="white rounded-lg elevation-12">
        <header>
            <h2 class="text-center red--text tituloCadastro">Cadastro de Usuarios - {{userLogin}}</h2>
        </header>
        <v-form class="col s12" ref="form" v-model="valid" lazy-validation>
            <v-container>
                <v-row>
                    <v-text-field dense class="col-12 col-md-6" v-model="user.nome" id="nome" counter maxlength="100" hint="Digite o Nome do Usuário" label="Nome" color="primary" :rules="[rules.noEmpty]"></v-text-field>
                    <v-text-field dense class="col-12 col-md-6" v-model="user.departamento" id="departamento" counter maxlength="45" hint="Digite o Departamento do Usuário" label="Departamento" color="primary" :rules="[rules.noEmpty]"></v-text-field>
                    <v-text-field dense class="col-12" v-model="user.email" id="email" counter maxlength="50" hint="Digite o E-mail do Usuário" label="E-mail" color="primary" :rules="[rules.email]"></v-text-field>
                    <v-textarea dense class="col-12" v-model="user.obs" id="obs" label="Observação" counter maxlength="500" hint="Observação" color="primary"></v-textarea>
                    <v-select dense class="col-12 col-md-6" @change="limparNaoTecnico()" :items="listaPerfis" v-model="user.perfil" label="Perfil do Usuário" color="primary" :rules="[rules.noEmpty]"></v-select>
                    <v-radio-group label="Situação" v-model="user.situacao" row :rules="[rules.noEmpty]">
                        <v-radio label="Ativo" value="Ativo" color="primary"></v-radio>
                        <v-radio label="Inativo" value="Inativo" color="primary"></v-radio>
                    </v-radio-group>

                    <v-select dense class="col-12 col-md-6" v-show="user.perfil == 'Técnico'" :items="laboratorios" item-text="descricao" item-value="laboratorioId" v-model="user.laboratorioId" label="Laboratório" color="primary"></v-select>
                    <v-radio-group dense class="col-12 col-md-6" label="Pode alterar laboratório?" v-model="user.podealterarlab" :disabled="user.perfil != 'Técnico'" :rules="[rules.noEmpty]" row>
                        <v-radio label="Sim" value="Sim" color="primary"></v-radio>
                        <v-radio label="Não" value="Não" color="primary"></v-radio>
                    </v-radio-group>
                </v-row>
                <v-row class="my-6 mx-1">
                    <v-toolbar dense elevation="1">
                        <v-toolbar-title>Senha</v-toolbar-title>
                        <v-divider class="mx-4" vertical></v-divider>
                        <b v-if="!user.usuarioId" class="primary--text">A senha para acesso ao sistema será enviada para o e-mail cadastrado.</b>
                        <template v-else>
                            <v-spacer></v-spacer>
                            <v-btn text @click="resetarSenha">Resetar senha<v-icon>mdi-lock-reset</v-icon>
                            </v-btn>
                        </template>
                    </v-toolbar>
                </v-row>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-btn x-large class="mx-6" @click="cancelar()">Cancelar</v-btn>
                    <v-btn x-large @click="criarUsuario">Salvar </v-btn>
                </v-row>
            </v-container>
        </v-form>
    </v-card>
</div>
</template>

<script>
import api from "@/api/api.js";
export default {
    name: "CadastroUsuario",
    created() {
        if (JSON.parse(localStorage.user).perfil != 'Administrador') {
            this.$store.dispatch('exibiAlerta', {
                value: true,
                type: 'error',
                message: "Voce não tem Autorização!"
            });
            this.$router.push({
                name: 'Home'
            });
        }
    },
    mounted() {
        this.load();
    },
    data() {
        return {
            dialog: false,
            valid: true,
            originalSenha: {},
            alert: {
                value: false,
                type: "error",
                message: ""
            },
            user: {
                nome: "",
                email: "",
                senha: "",
                departamento: "",
                situacao: "Ativo",
                perfil: "",
                obs: "",
                laboratorioId: "",
                podealterarlab: "Não",
            },
            userLogin: '',
            listaPerfis: ["Administrador", "Básico", "Comercial", "Expedição", "Faturamento", "Qualidade", "Técnico"],
            row: null,
            laboratorios: [],
        };
    },
    methods: {
        cancelar(){
            this.$router.push({ name: "Usuarios"});
        },
        criarUsuario() {
            if (!this.$refs.form.validate()) return false;
            if (this.user.perfil != "Técnico") {
                delete this.user.laboratorioId;
            }
            if (this.user.usuarioId == undefined) {
                api.adicionar("usuarios", this.user).then((response) => {
                        if (response.status == 201) {
                            this.$store.dispatch('exibiAlerta', {
                                value: true,
                                type: 'success',
                                message: "Usuário Cadastrado com Sucesso!"
                            });
                            this.$router.push({
                                name: "AlterarUsuario",
                                params: {
                                    id: response.data.usuario.usuarioId
                                }
                            });
                            this.load();
                        }
                        if(response.data.errosemail != ""){
                            setTimeout(()=>{ 
                                this.$store.dispatch('exibiAlerta', {
                                    value: true,
                                    type: 'error',
                                    message: 'Falha ao enviar e-mail: ' + response.data.errosemail
                                });
                            }, 100)
                        }
                        this.cancelar()

                })
            } else {
                if (this.user.senha === '') this.user.senha = this.originalSenha;
                api.editar("usuarios/" + this.user.usuarioId, this.user).then((response) => {
                    if (response.status == 204) {
                        this.$store.dispatch('exibiAlerta', {
                            value: true,
                            type: 'success',
                            message: "Usuário Alterado com Sucesso!"
                        });
                        this.user.senha = '';
                        this.cancelar()
                    }
                })
            }
        },
        load() {
            api.listar("laboratorios").then(response => {
                this.laboratorios = response.data
                    .filter(v=>v.situacao == "Ativo")
            });
            if (this.$route.params.id != undefined) {
                api.listar("usuarios/" + this.$route.params.id).then(response => {
                    this.originalSenha = response.data.senha
                    this.user = response.data;
                    let id = this.user.usuarioId.toString()
                    this.userLogin = "CAL" + id.padStart(5,"0")
                });
            }
        },
        resetarSenha() {
            api.editar("usuarios/resetsenha/" + this.user.usuarioId, this.user).then(response => {
                if (response.status == 201) {
                    this.$store.dispatch('exibiAlerta', {
                        value: true,
                        type: 'success',
                        message: "A senha do usuario foi resetada!"
                    });
                    if(response.data.errosemail != ""){
                        setTimeout(()=>{ 
                            this.$store.dispatch('exibiAlerta', {
                                    value: true,
                                    type: 'error',
                                    message: 'Falha ao enviar e-mail: ' + response.data.errosemail
                                });
                        }, 100)
                    }
                }
            });
        },
        limparNaoTecnico(){
                this.user.podealterarlab = "Não"
                this.user.laboratorioId = ""
        }
    },
};
</script>
