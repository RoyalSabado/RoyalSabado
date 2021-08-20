import http from '@/api';
import router from '@/router';
import store from '@/store';
import moment from "moment";

const api = {
    async listar(endpoint, awaitResquest) {
        let request = null
        if(awaitResquest == true){
            request = await http.get(endpoint)
        }else{
            request = http.get(endpoint)
        }
        
        return request
    },
    adicionar(endpoint,dados){
        dados.regidh = moment(new Date().toISOString()).format("YYYY-MM-DDTHH:mm:ss");
        dados.regiusu = JSON.parse(localStorage.user).usuarioId;
      return  http.post(endpoint, dados).catch((err)=>{
        console.log(err);
        store.dispatch('exibiAlerta', {
            value: true,
            type: 'error',
            message: "Erro ao Salvar!"
        });
        });
    },
    editar(endpoint, dados){
        if(typeof(dados) == 'object'){
            dados.regadh = moment(new Date().toISOString()).format("YYYY-MM-DDTHH:mm:ss");
            dados.regausu = JSON.parse(localStorage.user).usuarioId;
        }

       return http.put(`${endpoint}`, dados).catch((err) => {
           if(err.response.status == 412){
            store.dispatch('exibiAlerta', {
                value: true,
                type: 'error',
                message: err.response.data
            });
           }
            console.log(err);
        })
    },
    deletar(endpoint, id){
        return http.delete(`${endpoint}/${id}`).catch((err) => {err;})
    },
    getAutorization(){
        localStorage.token= '';
        router.push("/login")
    }
}
export default api;
