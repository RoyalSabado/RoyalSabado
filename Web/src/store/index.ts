import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

let UltimoAlert = moment.now()
export default new Vuex.Store({
  state: {
      downloadState: false,
      gridItensOS: false,
      alert: {value: false, type: 'error'},
      token: localStorage.token,
      user: localStorage.user,
      userVerComo: 'None'
  },
  mutations: {
      setToken: (state, payload) => state.token = payload,
      setUser: (state, payload) => state.user = payload,
      setAlert: (state, payload) => state.alert = payload,
      setVerComo: (state, payload) => state.userVerComo = payload,
      setDownload: state => state.downloadState = true,
      resetDownload: state => state.downloadState = false,
      atualizarGridOS_true: state => state.gridItensOS = true,
      atualizarGridOS_false: state => state.gridItensOS = false,
  },
  actions: {
    exibiAlerta({ commit }, payload){
        commit("setAlert", payload);
    }
  },
  modules: {
  },
  getters:{
      getAlert: (state) => {
        return state.alert;
      },
      getUser: (state) =>{
          return JSON.parse(state.user);
      }
  }
})
