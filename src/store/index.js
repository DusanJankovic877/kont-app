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
    posts: {}

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
    setCreatedPost(state, payload){
      state.post = payload;
    },
    setAllPosts(state, payload){
      state.posts = payload
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
    async setCreatePost(state, payload){
     const request =  await postService.setCreatePost(payload);
     state.commit('setCreatedPost', request.data.ops);
     state.commit('setContentsAfterCreated');
    },
    async getAllPosts(state, payload){
      const allPosts = await postService.getAllPosts();
      state.commit('setAllPosts', allPosts);
    
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
