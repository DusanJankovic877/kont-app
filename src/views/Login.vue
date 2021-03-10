<template>
<div class="action">
    <b-form class="col-lg-4" @submit.prevent >
        <h1>Login</h1>
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
      
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          placeholder="Enter password"
      
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="secondary" @click="handleSubmit">Prijavi se</b-button>
    </b-form>
</div>
    

</template>
<script>
import {mapActions} from 'vuex'
export default {
    data(){
        return{
             form: {
          email: '',
          password: ''
    
        },    
        }
    },
    methods: {
        ...mapActions(['login']),
       async handleSubmit(){
            await this.login(this.form);
        }
    },

}
</script>
<style scoped>
.action {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    /* background-color: lightgray; */
}
form {
    
    background-color: lightgray;
    padding:125px 50px;
}
/* button {
    margin-left: 405px !important;
} */
</style>
