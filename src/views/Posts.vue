<template>
    <div>

    <h1>All Posts</h1>
       <div class="content-view" ref="contentContainer">


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
        ...mapGetters(['deltaS']),
    },
    mounted(){
        let article = document.createElement('article');
        let quill = new Quill(article, {});
        quill.setContents(this.deltaS);
        setTimeout(() => { this.$refs.contentContainer.appendChild(article) }, 0);
    },
    beforeRouteEnter(to,from,next){
      if(store.getters.isLoggedIn === false)next('/')
      next();
    }
}
</script>
<style scoped>

</style>