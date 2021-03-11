<template>
  <div id="app">
    <div v-if="isLoggedIn">
      <navbar/>
      <router-view/>

    </div>
    <div v-else>
    
      <login/>  
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Navbar from './layouts/Navbar'
import Login from './views/Login'
  export default{
    components: {
      Navbar,
      Login
    },
    data(){
      return{
        isLogged: false
      }
    },
    computed: {
      ...mapGetters(['isLoggedIn'])
    }

  }
</script>

<style>
*{
  border-radius: 0 !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
