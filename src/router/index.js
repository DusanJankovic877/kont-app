import Vue from 'vue'
import VueRouter from 'vue-router'
import Posts from '../views/Posts.vue'
import CreatePost from '../views/CreatePost.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/create',
    name: 'CreatePost',
    component: CreatePost
    
  }
]

const router = new VueRouter({
  routes
})

export default router
