<template>
<div>

    <button class="btn btn-secondary" @click="$router.replace('/create')">Edit post</button>
    <div class="content-view" ref="contentContainer">


    </div>
</div>
</template>
<script>
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
    }
}
</script>

