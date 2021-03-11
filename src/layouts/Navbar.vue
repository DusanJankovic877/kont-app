<template>
    <div>
  <b-navbar toggleable="lg" type="dark" variant="light">
    <b-navbar-brand href="#">
        <router-link to="/">Admin panel</router-link> 
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
    <b-navbar-nav>
        <b-nav-item href="#">
            <router-link to="/">Posts</router-link> 
        </b-nav-item>
        <b-nav-item href="#">
            <router-link to="/create">Create Post</router-link> 
        </b-nav-item>
    </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
          <!-- <b-button>Odjavi se</b-button> -->
                   
        <b-button @click="handleLogout">Odjavi se</b-button>
           
      


      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data(){
    return {

    }
  },
  methods: {
    ...mapActions(['logout']),
    async handleLogout(){
      await this.logout({"token": localStorage.token});
    }
  }
}
</script>

<style scoped>
a{
    color: black;
}
</style>