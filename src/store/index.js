import Vue from 'vue'
import Vuex from 'vuex'
import authService from '../services/authService'
import postService from '../services/postService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedUser: JSON.parse(localStorage.getItem('user')),
    token: localStorage.getItem('token'),
    deltaS: undefined,
    contents: '',
    post: {},
    posts: {},
    post:{}

  },
  mutations: {
    setLogin(state, payload){
      state.loggedUser = payload
    },
    setLogoutUser(state){
      state.loggedUser = ''
    },
    setDelta(state, payload){
      state.deltaS = payload
    },
    setContent(state, payload){
      state.contents = payload
    },
    setContentsAfterCreated(state, payload){
      state.contents = ''
    },
    setAllPosts(state, payload){
      state.posts = payload
    },
    setPost(state, payload){
      state.post = payload
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
    },
    async getAllPosts(state, payload){
      const allPosts = await postService.getAllPosts();
      state.commit('setAllPosts', allPosts);
    },
    async getPost(state, payload){
      const response = await postService.getPost(payload);
      state.commit('setPost', response);
      // console.log(response);
      state.commit('setDelta', response.delta)
    }

  },
  getters:{
    loggedUser: (state) => state.loggedUser,
    isLoggedIn: (state) => !!state.loggedUser,
    deltaS:  (state) => state.deltaS,
    contents: (state) => state.contents,
    post: (state) =>state.post,
    posts: (state) =>state.posts,
  },
  modules: {
  }
})
