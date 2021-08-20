<template>
<v-card class="px-0 py-0">
    <v-toolbar dense elevation="1">
        <v-toolbar-title class="primary--text">Desafios</v-toolbar-title>
        <v-divider class="mx-4" vertical></v-divider>
        <v-spacer></v-spacer>
        <v-divider class="mx-4" vertical></v-divider>
        <v-toolbar-items>
            <v-btn text @click="novo()">
                Novo
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
    <div class="col-12">
    <div class="col-12 d-md-flex">
        <v-text-field v-model="search" append-icon="mdi-magnify" class="ml-1 mr-1 col-12" label="Buscar" single-line hide-details></v-text-field>
    </div>
    <v-data-table class="col-12" :headers="headers" :items="desafios" :search="search">
        <template v-slot:[`item.descricao`]="{ item }">
            <v-edit-dialog
                :return-value.sync="item.descricao"
                large
            >
                <div>{{ item.descricao }}</div>
                <template v-slot:input>
                    <div class="mt-4 text-h6 text-center">Atualizar Descricao</div>
                    <v-text-field
                        v-model="item.descricao"
                        label="Editar"
                        single-line
                        autofocus
                    />
                </template>
            </v-edit-dialog>
        </template>
        <template v-slot:[`item.grupo`]="{ item }">
            <v-edit-dialog
                :return-value.sync="item.grupo"
                large
            >
                <div>{{ item.grupo }}</div>
                <template v-slot:input>
                    <div class="mt-4 text-h6 text-center">Atualizar Grupo</div>
                    <v-text-field
                        v-model="item.grupo"
                        label="Editar"
                        single-line
                        autofocus
                    />
                </template>
            </v-edit-dialog>
        </template>
        <template v-slot:[`item.pagamento`]="{ item }">
            <v-edit-dialog
                :return-value.sync="item.pagamento"
                large
            >
                <div>{{ item.pagamento }}</div>
                <template v-slot:input>
                    <div class="mt-4 text-h6 text-center">Atualizar Pagamento</div>
                    <v-text-field
                        v-model="item.pagamento"
                        label="Editar"
                        single-line
                        autofocus
                    />
                </template>
            </v-edit-dialog>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-btn fab x-small v-if="item.situacao == 'Editando'">
                <v-icon color="primary">mdi-pencil</v-icon>
            </v-btn>
            <v-btn fab x-small v-else>
                <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
        </template>
    </v-data-table>
    </div>
</v-card>
</template>

<script>
export default {
    mounted() {
    },
    data() {
        return {
            search: "",
            headers: [{
                    text: "ID",
                    align: "start",
                    value: "desafioId",
                    width: "5%"
                },
                {
                    text: "Descrição",
                    value: "descricao",
                    width: "30%"
                },
                {
                    text: "Grupo",
                    align: "center",
                    value: "grupo",
                    width: "30%"
                },
                {
                    text: "Pagamento",
                    value: "pagamento",
                    width: "15%"
                },
                {
                    text: "Situação",
                    value: "situacao",
                    width: "15%"
                },
                {
                    text: "#",
                    value: "actions",
                    align: "center",
                    width: "5%"
                },
            ],
            desafioNovo: {desafioId: 1, descricao: 'Item Novo', grupo: 'Item Novo', pagamento: 1, situacao: 'Editando'},
            desafios: [
                {desafioId: 1, descricao: '', grupo: '', pagamento: 1, situacao: 'Salvo'},
            ],
        };
    },
    methods: {
        novo(){
            let id = 0
            this.desafios.forEach(element => {
                if(element.desafioId > id){id = element.desafioId}
            });
            this.desafioNovo.desafioId = id+1
            this.desafios.push({ ...this.desafioNovo })
        }
    },
};
</script>