import Vue from 'vue'
import Vuex from 'vuex'
import authService from '../services/authService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedUser: JSON.parse(localStorage.getItem('user')),
    token: localStorage.getItem('token'),

  },
  mutations: {
    setLogin(state, payload){
      state.loggedUser = payload
    },
    setLogoutUser(state){
      state.loggedUser = ''
    }
  },
  actions: {
    async login(state, payload){
      const response = await authService.login(payload)
      const loggedUser = response.data.user;
      state.commit('setLogin', loggedUser);
      localStorage.setItem('token', response.data.token.original.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    },
    async logout(state, payload){
      await authService.logout(payload)
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.commit('setLogoutUser');
    }

  },
  getters:{
    loggedUser: (state) => state.loggedUser,
    isLoggedIn: (state) => !!state.loggedUser
  },
  modules: {
  }
})
