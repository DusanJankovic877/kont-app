<template>
  <create-post-form
    :errors="errors"
    :editorOption="editorOption"
    :contents="contents"
    :deltaS="deltaS"
    @preview="showPreview"
    @submit="submit"
  />
</template>
<script>
import store from '../store'
import Error from '../components/Error.vue'
import { Input } from 'iview'
import { mapGetters } from 'vuex'
import CreatePostForm from '../components/CreatePostForm.vue'
export default{
  components: {
    CreatePostForm,
  },
  data() {
    return{
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
    ...mapGetters(['deltaS', 'contents']),
  },
  beforeRouteEnter(to,from,next){
    if(store.getters.isLoggedIn === false)next('/')
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
h1{
  text-align: center;
}
</style>
