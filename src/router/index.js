import Vue from 'vue'
import VueRouter from 'vue-router'
import Posts from '../views/Posts.vue'
import CreatePost from '../views/CreatePost.vue'
import BlogPostPreview from '../components/BlogPostPreview.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
  },
  {
    path: '/create',
    name: 'CreatePost',
    component: CreatePost,
  },
  {
    path: '/preview',
    name: 'PreviewPost',
    component: BlogPostPreview
  }
]

const router = new VueRouter({
  routes
});

// router.beforeEach((from,to, next) => {
  // console.log(router.options.routes[0].path);
  // const auth = from.meta.isAuthRequired;
  // console.log(from);
  // auth ? next('') : next('/');
  // if(!auth){
  //   console.log(from);
  //   console.log('nesto');
  //   next('/');
  //   return;
  // }
  // else{
  //   console.log(from);
  //   next();
   
  // }
  // next('/')
  // return;
// });
export default router
