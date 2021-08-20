<template>
    <div>
        
    </div>
</template>

<script>

export default {
    mounted() {
        if(this.$route.params.message != undefined){
            this.alert = this.$route.params.message;
        }
        if(localStorage.user == undefined){
            this.$router.push("/login")
        }
    },
    data() {
        return {
            text: "",
            save: false
        };
    },
    methods: {
        criarUsuario(){
            this.$store.dispatch('exibiAlerta', {value: true, type: 'success', message: "Alterado"})
        }
    },
};
</script>

<style>
</style>
