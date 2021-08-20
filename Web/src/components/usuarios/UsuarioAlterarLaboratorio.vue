<template>
<v-dialog v-model="dialog" width="400px" height="400px" >
    <template class="col-12" v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" text class="text-center" color="primary">
            Alterar Laboratorio
        </v-btn>
    </template>
    <v-card>
        <header class="py-2">
            <h2 class="text-center red--text tituloCadastro">Alterar Laboratorio</h2>
        </header>
        <v-divider></v-divider>
        <v-card-text class="d-flex align-center" style="height: 200px">
            <v-form class="col s12" ref="form" v-model="valid" lazy-validation>
                <v-select class="col-12" v-model="LaboratorioDescricao" :rules="[rules.noEmptySelect]" :items="laboratorios" item-value="laboratorioId" item-text="descricao" label="Laboratório" color="primary" dense></v-select>
            </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="cancelar"> Cancelar </v-btn>
            <v-btn @click="salvar"> Salvar </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
import api from '@/api/api.js';
export default {
    mounted() {
        this.load()
        
    },
    data() {
        return {
            LaboratorioDescricao: '',
            laboratorios: {},
            valid: false,lidacao
            },
            usuarioId: JSON.parse(localStorage.user).usuarioId,
            user: {},
            dialog: false,
        };
    },
    methods: {
        load(){
            
            api.listar("laboratorios").then(response => {
                this.laboratorios = response.data
                    .filter(v=>v.situacao == "Ativo")
            });
            api.listar("Usuarios/" + this.usuarioId).then(respose => {
                this.user = respose.data;
            })
        },
        cancelar() {
            this.dialog = false;
            this.$refs.form.reset()
        },
        salvar(){
            this.user.laboratorioId = this.laboratorios.find(descricao => descricao.descricao == this.LaboratorioDescricao).laboratorioId
            api.editar("Usuarios/AlterarSenha/" + this.usuarioId, this.user).then(response => {
                if (response.status == 201) {
                    this.$store.dispatch('exibiAlerta', {
                        value: true,
                        type: 'success',
                        message: "Laboratorio alterado com Sucesso!"
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