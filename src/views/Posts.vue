<template>
    <div>
      <h1>Svi Postovi</h1>

      <div class="row col-lg-9 m-auto">
        <div class="col-lg-4" v-for="post in posts.data" :key="post.id">
          <b-card
            class="card "
            :title="post.title"
            :img-src="post.img_url"
            img-alt="Image"
            img-top
            tag="article"
          >
            <b-card-text>
              {{post.description}}
            </b-card-text>

            <b-button :to="{name: 'post', params: {id: post.id}}" variant="secondary">Pogledaj objavu</b-button>
           

          </b-card>
        </div>
        <!-- <div class="content-view" ref="contentContainer">
      

        </div> -->
      </div>
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
        ...mapGetters(['posts',]),
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
h1{
  text-align: center;
}
</style>