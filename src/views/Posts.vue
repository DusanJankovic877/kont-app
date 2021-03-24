<template>
    <h1>All Posts</h1>
</template>
<script>
import store from '../store'
export default{
    data(){
        return {

        }
    },
    beforeRouteEnter(to,from,next){
      if(store.getters.isLoggedIn === false)next('/')
      next();
    }
}
</script>
<style scoped>

</style>