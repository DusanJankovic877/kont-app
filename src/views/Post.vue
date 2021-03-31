<template>
    <div class="col-lg-8 m-auto">
      <b-card
    :title="post.title"
    :img-src="post.img_url"
    img-alt="Image"
    img-top
    tag="article"
  >
    <b-card-text>
      {{post.description}}
    </b-card-text>
    <b-card-text>
        <div class="content-view" ref="contentContainer" style="pointer-events: none;">
        </div>
    </b-card-text>
    <b-button :to="{name: 'editPost', params: {id: post.id}}" variant="secondary">Edit Post</b-button>
    <b-button class="delButton" variant="danger" @click="deletePost">Delete Post</b-button>

  </b-card>

    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import store from '../store'
import Quill from 'quill'
export default {
    data() {
        return{
            content: ''
        }
    },

    computed:{
        ...mapGetters(['post'])
    },
    mounted(){
        let article = document.createElement('article');
        let quill = new Quill(article, {});
        quill.setContents(JSON.parse(this.post.delta));
        setTimeout(() => { this.$refs.contentContainer.appendChild(article) }, 0);
    },
    methods:{
        ...mapActions(['getPost']),
      
  async deletePost() {
    
    if(confirm("Are you sure that you want to delete this post?")){
       await store.dispatch('deletePost', this.post.id);
        this.$router.push('/posts');
    }
  }

    },
    async beforeRouteEnter(to,from,next){
        if(store.getters.isLoggedIn === false)next('/');
        await store.dispatch('getPost', to.params.id)
        next();
    }
}
</script>
<style scoped>
.delButton{
    
    float: right;
}
</style>