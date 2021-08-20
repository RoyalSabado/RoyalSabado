<template>
<div class="primary d-flex justify-center flex-grow-1 align-center">
    <div class="white col-lg-5 col-md-5 col-sm-8 rounded-lg elevation-12" id="container-login">
            <v-alert class="col-12" @click="alert.value = false" border="left" dismissible :value="alert.value" :type="alert.type">{{alert.message}}</v-alert>
        <v-container >
            <v-form ref="form" v-model="valid"
                lazy-validation>
            <header class="py-4 text-center">
                <!-- img src="../../assets/logo-calibratec.png" / -->
            </header>
            <div class="mb-4">
                <v-text-field label="Digite seu Usuário" :rules="[rules.noEmpty]" :value="loginMascara" id="txtUsuario" @change="loginChange" maxlength="8" class="validate" color="primary" required hide-details="auto" />
            </div>
            <div class="mb-4">
            <v-text-field label="Digite sua Senha" :rules="[rules.noEmpty]" type="password" v-model="user.Senha" class="validate" color="primary" required hide-details="auto" id="Senha"/>
            </div>
            <v-row align="center" justify="space-around" class="mb-1 mt-8">
                <v-btn id="Logar" class="col-9 py-6" @click.prevent="login" v-if="!loading">Entrar</v-btn>
                  <v-progress-circular indeterminate color="primary" v-else></v-progress-circular>
            </v-row>
            </v-form>
        </v-container>
    </div>
</div>
</template>

<script>
import http from "@/api";

export default {
    name: "Login",
    mounted() { 

    },
    data() {
        return {
            valid: false,
            alert: {value: false },
            usuario: "",
            user: {
                UsuarioId: "",
                Senha: "",
            },
            loading: false,

        };
    },
    computed: {
        loginMascara: function(){
            if(this.usuario!=""){
                var v = "";
                if((this.usuario).indexOf("CAL")){
                     v = "CAL"
                    v= v + this.usuario.padStart(5,"0")
                }else{
                    v= v + this.usuario.padStart(5,"0")
                }
                return v
            }else{
                return ""
            }
        }
    },
    methods: {
        loginChange(e){
            this.usuario = e
        },
        login() {
            if(!this.$refs.form.validate()) return false;
            this.usuario = document.getElementById("txtUsuario").value;
            let number = (this.loginMascara).split('L')[1]

            this.user.UsuarioId = parseInt(number);
            this.loading = true;
            http
                .post("Autenticacao/login", this.user)
                .then((response) => {
                    this.$store.commit("setToken", response.data.token);
                    this.$store.commit("setUser", response.data.user);
                    localStorage.token = response.data.token;
                    localStorage.user = JSON.stringify(response.data.user);
                    localStorage.userVerComo = response.data.user.perfil
                    this.$router.push("/");
                })
                .catch((err) => {
                    if(err.response != undefined){
                        if (err.response.status == "404") {
                            this.alert.value = true;
                            this.alert.type = "error";
                            this.alert.message = err.response.data.message;
                        }else{
                            this.alert.value = true;
                            this.alert.type = "error";
                            this.alert.message = err.response.data.message;
                        }
                    }else{
                        this.alert.value = true;
                        this.alert.type = "error";
                        this.alert.message = err.message;
                    }
                })
                .finally(() => {
                        this.loading = false;
                });
        },
    },
};
</script>
