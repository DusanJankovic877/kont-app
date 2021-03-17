}
<template>

    <!-- <h1>Create Post</h1> -->
    <div class="row col-lg-12">


    <b-form @submit.prevent class="m-auto">
            <h1>Kreiraj objavu</h1>
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
      
    </b-form-group>
      <b-button  type="submit" variant="secondary">Submit</b-button>
    </b-form>
    </div>


    
</template>
<script>

// import Quill from 'quill'
// import yourQuillModule from '../yourModulePath/yourQuillModule.js'
// Quill.register('modules/yourQuillModule', yourQuillModule)

import { quillEditor } from 'vue-quill-editor'
export default{
      components: {
    quillEditor
  },
    data() {
       return{
        content: '<h2>I am Example</h2>',
        editorOption: {
          // Some Quill options...
        }
       } 
    },
    methods: {
        onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange({ quill, html, text }) {
        console.log('editor change!', quill, html, text)
        this.content = html
      }  
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted() {
      console.log('this is current quill instance object', this.editor)
    }
}
</script>
<style scoped>
form{
    align-items: center !important;
}
</style>
