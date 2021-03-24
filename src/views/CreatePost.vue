}
<template>

    <!-- <h1>Create Post</h1> -->
    <div class="">


    <b-form @submit.prevent class="m-auto">
            <h1>Kreiraj objavu</h1>
            <div class="post-inputs">
              <div class="title-input">
                <Input v-model="title"></Input>
                <Error>title must be more than 10 characters</Error>
              </div>
              <div class="img-input">
                <Input v-model="image_url"></Input>
                <Error>post must have image</Error>

              </div>
            </div>
            <quill-editor
                name="aquill1"
                class="col-lg-12"
                ref="myQuillEditor"
                v-model="content"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
            />

      

      <b-button  type="submit" variant="secondary">Submit</b-button>
      
    </b-form>
    <button class="btn btn-secondary" @click="showPreview">preview</button>
    </div>


    
</template>
<script>

// import Quill from 'quill'
// import yourQuillModule from '../yourModulePath/yourQuillModule.js'
// Quill.register('modules/yourQuillModule', yourQuillModule)
import store from '../store'
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'
import Error from '../components/Error.vue'
import { Input } from 'iview'
import { mapGetters } from 'vuex'
export default{
      components: {
    quillEditor,
    Error,
    // Button,
    Input,
    // Select
  },
    data() {
       return{
         title: '',
         image_url: '',
        content: '',
        editorOption: {
          // Some Quill options...
          debug: 'info',
          placeholder: 'type something',
          readOnly: true,
          theme: 'snow'
        },
        delta: undefined,
        mounting: false
       } 
    },
    watch:{
      content(val){
        if(!this.mounting){

          this.$store.commit('setDelta', this.$refs.myQuillEditor.quill.getContents());
        }
        this.$store.commit('setContent', val);
          this.mounting = false;

      }
    },
    methods: {
        onEditorBlur(quill) {
        // console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        // console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        // console.log('editor ready!', quill)
      },
      onEditorChange({ quill, html, text }) {
        // console.log('editor change!', quill, html, text)
        // this.content = html
      } ,
      submit(){

      },
      showPreview(){
        this.$router.replace('/preview')
      }
    },
    computed: {
      ...mapGetters(['deltaS', 'contents']),
      editor() {
        // return this.$refs.myQuillEditor.quill
      }
    },
    mounted() {
      // console.log('this is current quill instance object', this.editor)
      this.mounting = true
      if(!this.content && this.contents){
        this.content = this.contents;
      }
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
</style>
