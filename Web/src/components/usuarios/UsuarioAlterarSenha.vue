<template>
<v-dialog v-model="dialog" width="400px" height="400px" >
    <template class="col-12" v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" text class="col-12 text-center" color="primary">
            Alterar Senha
        </v-btn>
    </template>
    <v-card>
        <header class="py-2">
            <h2 class="text-center red--text tituloCadastro">Alteração de Senha</h2>
        </header>
        <v-divider></v-divider>
        <v-card-text style="height: 200px">
            <v-form class="col s12" ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="password" type="password" :rules="[rules.noEmpty, rules.senha]" :counter="8" maxlength="8" label="Nova senha" />
                <v-text-field v-model="newPassword" type="password" :rules="[rules.noEmpty, (v) => { return v == this.password || 'As senhas não são iguais'}]" :counter="8" maxlength="8" label="Confirmação da senha" />
            </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="cancelar"> Cancelar </v-btn>
            <v-btn @click="alterarSenha"> Salvar </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
import api from '@/api/api.js';
export default {
    mounted() {
        api.listar("Usuarios/" + this.usuarioId).then(respose => {
            this.user = respose.data;
        })
    },
    data() {
        return {
            valid: false,
            usuarioId: JSON.parse(localStorage.user).usuarioId,
            password: "",
            newPassword: "",
            user: {},
            dialog: false,
        };
    },
    methods: {
        cancelar() {
            this.password = '';
            this.newPassword = '';
            this.dialog = false;
            this.$refs.form.reset()
        },
        alterarSenha() {
            this.user.senha = this.newPassword;
            api.editar("Usuarios/AlterarSenha/" + this.usuarioId, this.user).then(response => {
                if (response.status == 201) {
                    this.$store.dispatch('exibiAlerta', {
                        value: true,
                        type: 'success',
                        message: "Senha Alterada com Sucesso!"
                    })
                    if(response.data.errosemail != ""){
                        setTimeout(()=>{ 
                            this.$store.dispatch('exibiAlerta', {
                                value: true,
                                type: 'error',
                                message: 'Falha ao enviar e-mail: ' + response.data.errosemail
                            });
                        }, 100)
                    }
                    this.cancelar();
                }
            });
        }
    },
};
</script>