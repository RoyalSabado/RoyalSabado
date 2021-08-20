<template>
<div class="hiddenPrint">
    <v-toolbar color="white" class="d-flex pa-2 flex-column" style="height: 80px">
        <v-spacer></v-spacer>
        <template>
            <v-toolbar-items v-for="(menu, index) in itensMenu" :key="index" class="hidden-sm-and-down">
                <v-tab>
                    <v-menu close-delay="300" offset-y open-on-hover open-on-click transition="scroll-y-transition">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="primary--text col-12" text v-bind="attrs" v-on="on" v-if="menu.itens">
                                <span v-bind="attrs" v-on="on">{{ menu.title }}</span>
                                <v-icon>mdi-chevron-down-circle</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-for="(submenu, index) in menu.itens" :key="index">
                                <v-list-item-title @click="navigate(submenu.route)">
                                    <v-btn class="col-12" text color="primary">
                                        {{ submenu.title }}
                                    </v-btn>
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-tab>
                <v-divider vertical></v-divider>
            </v-toolbar-items>
        </template>
    </v-toolbar>
</div>
</template>

<script>

export default {
    props: {
        appName: String,
    },
    data() {
        return {
            widthScreen: window.innerWidth,
            itensMenu: [
                {
                    title: "Cadastros",
                    itens: [{
                        title: "Desafios",
                        route: "HomeDesafio",
                    },
                    {
                        title:  "Jogadores",
                        route: "HomeJogador",
                    },
                    ],
                },
            ],
            attrs: "",
        }
    },
    created() {
        window.addEventListener("resize", this.Resize);
    },
    mounted() {
    },
    methods: {
        Resize(){
            this.widthScreen = window.innerWidth
        },
        navigate(route) {
            this.$router.push({ name: route});
        },
    },
};
</script>

<style scoped>
a {
    text-decoration: none;
}

.main_nav {
    padding: 0px 20px;
}

.header {
    height: 65px;
    padding: 0;
}

.nav-wrapper {
    padding: 0;
}

.nav-border:hover {
    border-bottom: red 3px solid !important;
}
</style>
