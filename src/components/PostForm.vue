<template>
      <b-form @submit.prevent class="m-auto">
    {{post}}
    <div class="post-inputs row">
      <div class="title-input col-lg-3 m-auto">
        <b-form-group
          id="title-group"
          label="Unesite Naslov"
          label-for="title"
        >
            <b-form-input id="title" v-model="postFormData.title" label="title"></b-form-input>
            <b-alert variant="danger" :show="!!errors.title">{{errors.title}}</b-alert>
        </b-form-group>
      </div>
      <div class="description-input col-lg-3 m-auto">
        <b-form-group
          id="description-group"
          label="Unesite Opis"
          label-for="description"
        >
            <b-form-input id="description" v-model="postFormData.description" label="description"></b-form-input>
            <b-alert variant="danger" :show="!!errors.description">{{errors.description}}</b-alert>
        </b-form-group>

      </div>
      <div class="img-input col-lg-3 m-auto">
        <b-form-group
          id="file-group"
          label="Unesite putanju slike"
          label-for="image"
        >
          <b-form-input id="image" type="url" v-model="postFormData.img_url" placeholder="For example: https://somesite.com/img/image123.jpg"></b-form-input>
          <b-alert variant="danger" :show="!!errors.image_url">{{errors.image_url}}</b-alert>
        </b-form-group>

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
        <b-alert variant="danger" :show="!!errors.delta">{{errors.delta}}</b-alert>
    </div>
    <div class="row mt-5">
      <b-button  type="submit" variant="secondary" @click="submit" class="m-auto">Submit</b-button>
      <b-button variant="secondary" @click="showPreview" class="m-auto">preview</b-button>
    </div>
{{deltaS}}
  </b-form>
</template>
<script>
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'
import { mapGetters } from 'vuex'
import store from '../store'

export default {
    components:{
        quillEditor
    },
    data(){
        return{
            mounting: false,
            delta: undefined,
            content: ''
          
        }
    },
    props:{
        postFormData: Object,
        errors: Object,
        editorOption: Object,
        contents: String,
        deltaS: Object,
    },
    watch:{
        content (val) {
          console.log('val', val);
        if (!this.mounting) {
            this.$store.commit('setDelta', this.$refs.myQuillEditor.quill.getContents())
        }
        this.$store.commit('setContent', val)
        this.mounting = false
        }
    },
    methods: {
        submit(){
            const delta = !!this.content ? JSON.stringify(this.deltaS) : '';
            const user = JSON.parse(localStorage.getItem('user'))
            const formData = {title: this.postFormData.title, description: this.postFormData.description, image_url: this.postFormData.image_url, delta: delta, userId: user.id};
            this.$emit('submit', formData)
        },
        showPreview(){
            this.$emit('preview')
        }
    },


    mounted() {
        this.mounting = true
        if(!this.content && this.contents){
            this.content = this.contents;
        }
  }
}
</script>