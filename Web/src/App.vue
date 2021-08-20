<template>
<v-app style="max-width: 100%">
    <Header />
    <v-main>
        <v-container>
            <template v-if="alerts.length > 0">
                <div class="col-6" style="position: fixed; right: 20px; top: 90px; z-index: 999">
                    <v-alert v-for="elem in alerts" :key="elem.id"
                        class="col-12 float-right" @click="alert.value = false"
                        border="left" dismissible :value="elem.value" :type="elem.type">
                        {{elem.message}}
                    </v-alert>
                </div>
            </template>
            <router-view />
        </v-container>
    </v-main>
    <Footer />
</v-app>
</template>

<script>
import Vue from "vue";
import Header from "./components/HeaderComponent.vue";
import Footer from "./components/FooterComponent.vue";

import { mapState } from 'vuex'

export default Vue.extend({
    name: "App",
    components: {
        Header,
        Footer,
    },
    data() {
        return {
            alerts: [],
            id: 0
        };
    },
    mounted() {
        document.title = "Royal no sábado, não nesse."
        this.concetarMongoDb()
    },
    updated() {

    },
    watch: {
        alert(){
            if(this.$store.getters.getAlert.value == true){
                let alert = this.$store.getters.getAlert
                alert.id = this.id
                this.id++

                this.alerts.push(alert)
                setTimeout(()=>{ 
                    this.alerts.splice(this.alerts.indexOf(alert),1)
                }, 10000)
            }
        }
    },
    computed: {
        ... mapState({
            alert: state => state.alert,
        }),
    },
    methods: {
    },
});
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
}

:root{
    --col-1: 8.33333333333333%;
    --col-2: 16.6666666666667%;
    --col-3: 25%;
    --col-4: 33.3333333333333%;
    --col-5: 41.6666666666667%;
    --col-6: 50%;
    --col-7: 58.3333333333333%;
    --col-8: 66.6666666666667%;
    --col-9: 75%;
    --col-10: 83.3333333333333%;
    --col-11: 91.6666666666667%;
    --col-12: 100%;
}
.col-1 {flex: 0 0 var(--col-1)!important; max-width: var(--col-1)!important;}
.col-2 {flex: 0 0 var(--col-2)!important; max-width: var(--col-2)!important;}
.col-3 {flex: 0 0 var(--col-3)!important; max-width: var(--col-3)!important;}
.col-4 {flex: 0 0 var(--col-4)!important; max-width: var(--col-4)!important;}
.col-5 {flex: 0 0 var(--col-5)!important; max-width: var(--col-5)!important;}
.col-6 {flex: 0 0 var(--col-6)!important; max-width: var(--col-6)!important;}
.col-7 {flex: 0 0 var(--col-7)!important; max-width: var(--col-7)!important;}
.col-8 {flex: 0 0 var(--col-8)!important; max-width: var(--col-8)!important;}
.col-9 {flex: 0 0 var(--col-9)!important; max-width: var(--col-9)!important;}
.col-10 {flex: 0 0 var(--col-10)!important; max-width: var(--col-10)!important;}
.col-11 {flex: 0 0 var(--col-11)!important; max-width: var(--col-11)!important;}
.col-12 {flex: 0 0 var(--col-12)!important; max-width: var(--col-12)!important;}

#app {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.border{border: 1px solid gray!important;}
.border-right{border-right: 1px gray solid!important;}
.border-left{border-left: 1px gray solid!important;}
.border-top{border-top: 1px gray solid!important;}
.border-bottom{border-bottom: 1px gray solid!important;}
.fz-10 {font-size: 10px;}
.fz-12 {font-size: 12px;}
.fz-14 {font-size: 14px;}
.ff-cn {font-family: 'Courier New', Courier, monospace;}
</style>
