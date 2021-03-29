<template>
  <b-form @submit.prevent class="m-auto">
    <h1>Kreiraj objavu</h1>
    <div class="post-inputs row">
      <div class="title-input col-lg-3 m-auto">
        <b-form-group
          id="title-group"
          label="Unesite Naslov"
          label-for="title"
        >
          <b-form-input id="title" v-model="title" label="title"></b-form-input>
        <b-alert variant="danger" :show="!!errorTitle">{{errorTitle}}</b-alert>
        </b-form-group>
        <!-- <Error>title must be more than 10 characters</Error> -->
      </div>
      <div class="description-input col-lg-3 m-auto">
        <b-form-group
          id="description-group"
          label="Unesite Opis"
          label-for="description"
        >
          <b-form-input id="description" v-model="description" label="description"></b-form-input>
        <b-alert variant="danger" :show="!!errorDescription">{{errorDescription}}</b-alert>

        </b-form-group>
        <!-- <Error>title must be more than 10 characters</Error> -->
      </div>
      <div class="img-input col-lg-3 m-auto">
        <b-form-group
          id="file-group"
          label="Unesite putanju slike"
          label-for="image"
        >
        <b-form-input id="image" type="url" v-model="image_url" placeholder="For example: https://somesite.com/img/image123.jpg"></b-form-input>
          <!-- <b-form-file
          id="file"
            v-model="image_url"
            :state="Boolean(image_url)"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
          ></b-form-file> -->
        <b-alert variant="danger" :show="!!errorImageUrl">{{errorImageUrl}}</b-alert>

        </b-form-group>
        <!-- <Error>post must have image</Error> -->
      </div>
    </div>
    <quill-editor
        name="aquill1"
        class="col-lg-12"
        ref="myQuillEditor"
        v-model="content"
        :options="editorOption"
    />
    <div class="col-lg-12">

        <b-alert variant="danger" :show="!!errorDelta">{{errorDelta}}</b-alert>
    </div>

    <div class="row mt-5">
      <b-button  type="submit" variant="secondary" @click="submit" class="m-auto">Submit</b-button>
      <b-button variant="secondary" @click="showPreview" class="m-auto">preview</b-button>
    </div>
    {{deltaS}}
  </b-form>
</template>
<script>
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
      description: '',
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
      mounting: false,
      errorTitle: '',
      errorDescription: '',
      errorImageUrl: '',
      errorDelta:''
    } 
  },
  watch:{
    content (val) {
      if (!this.mounting) {
        this.$store.commit('setDelta', this.$refs.myQuillEditor.quill.getContents())
      }
      this.$store.commit('setContent', val)
      this.mounting = false
    }
  },
  methods: {
    async submit(){
      const delta = JSON.stringify(this.deltaS);
      const user = JSON.parse(localStorage.getItem('user'))
      // console.log('data', JSON.parse(localStorage.getItem('user')));
      const formData = {title: this.title, description: this.description, image_url: this.image_url, delta: delta, userId: user.id};
      await this.$store.dispatch('setCreatePost', formData).then(success => {
        console.log('success response', success);
      }).catch(err => {
        this.errorTitle = err.response.data.errors.title[0];
        this.errorDescription = err.response.data.errors.description[0];
        this.errorImageUrl = err.response.data.errors.image_url[0];
        this.errorDelta = err.response.data.errors.delta[0];
      });
    },
    showPreview(){
      this.$router.replace('/preview')
    }
  },
  computed: {
    ...mapGetters(['deltaS', 'contents', 'post','loggedUser']),
  },
  mounted() {
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
