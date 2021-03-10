import Vue from 'vue'
import Vuex from 'vuex'
import authService from '../services/authService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async login(state, payload){
     await authService.login(payload)
      // console.log('action', payload);
    }
  },
  getters:{

  },
  modules: {
  }
})
