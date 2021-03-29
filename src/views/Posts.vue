<template>
    <div>

    <h1>All Posts</h1>
    <div class="row m-auto">
<!-- <div class="card" v-for="post in posts.data" :key="post.id"> -->
  <b-card
  class="card"
  v-for="post in posts.data" :key="post.id"
    :title="post.title"
    :img-src="post.img_url"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
   
  >
    <b-card-text>
      {{post.description}}
    </b-card-text>

    <b-button href="#" variant="secondary">Pogledaj objavu</b-button>
  </b-card>
<!-- </div> -->
       <!-- <div class="content-view" ref="contentContainer">
     

    </div> -->
    </div>
    {{deltaa}}
    </div>
</template>
<script>
import store from '../store'
import { mapGetters } from 'vuex'
import Quill from 'quill'
export default{
    data() {
        return{
            content: ''
        }
    },
    computed: {
        ...mapGetters(['deltaS', 'posts']),
    },
    mounted(){
        let article = document.createElement('article');
        let quill = new Quill(article, {});
        console.log(this.posts);
        quill.setContents(this.posts.delta);
        setTimeout(() => { this.$refs.contentContainer.appendChild(article) }, 0);
    },
    beforeRouteEnter(to,from,next){
      if(store.getters.isLoggedIn === false)next('/');
      store.dispatch('getAllPosts');
      next();
    }
}
</script>
<style scoped>
.card {
    margin: 5px;
}
</style>