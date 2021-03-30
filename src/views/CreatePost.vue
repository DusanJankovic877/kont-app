<template>
  <div>
    <h1 class="heading">{{this.$route.params.id ? 'Edit Post' : 'Create Post'}}</h1>
    <!-- :postFormData="this.$route.params.id? post : postFormData" -->
 
  <post-form
  :postFormData="this.$route.params.id? post : postFormData"
    :errors="errors"
    :editorOption="editorOption"
    :contents="contents"
    :deltaS="deltaS"
    @preview="showPreview"
    @submit="submit"
  />
  </div>
</template>
<script>
import store from '../store'
import { mapGetters } from 'vuex'
import PostForm from '../components/PostForm.vue'
export default{
  components: {
    PostForm,
  },
  data() {
    return{
      postFormData: {
        title: '',
        description: '',
        img_url: '',
        delta: {}
      },
      editorOption: {
        // Some Quill options...
        debug: 'info',
        placeholder: 'type something',
        readOnly: true,
        theme: 'snow'
      },
      errors: {title: '', description:'', image_url: '', delta: ''}
    } 
  },
  methods: {
    async submit(formData){
      await this.$store.dispatch('setCreatePost', formData).then(suc => {
        this.$router.push('/posts')
      }).catch(err => {
        if(!!err){
          !!err.response.data.errors.title ? this.errors.title = err.response.data.errors.title[0] : this.errors.title = '';
          !!err.response.data.errors.description ? this.errors.description = err.response.data.errors.description[0] : this.errors.description = '';
          !!err.response.data.errors.image_url ?  this.errors.image_url = err.response.data.errors.image_url[0] : this.errors.image_url = '';
          !!err.response.data.errors.delta ? this.errors.delta = err.response.data.errors.delta[0] : this.errors.delta = '';
        }
      });
    },
    showPreview(){
      this.$router.replace('/preview');
    }
  },
  computed: {
    ...mapGetters(['deltaS', 'contents', 'post']),
  },
  beforeRouteEnter(to,from,next){
    console.log('create form', to.params.id);
    if(store.getters.isLoggedIn === false)next('/')
    store.dispatch('getPost', to.params.id)
    next();
  }
}
</script>
<style>
form{
    align-items: center !important;
}
.ql-editor{
  height: 72vh;
}
.heading{
  text-align: center;
}
</style>
