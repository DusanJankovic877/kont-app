<template>
<div class="action">
    <b-form class="col-lg-4" @submit.prevent >
      <h1>Prijava</h1>
      <b-form-group
        id="input-group-1"
        label="Email addresa:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          :state="errors.email ? false : null"
          v-model="form.email"
          type="email"
          placeholder="Ukucajte email"
        ></b-form-input>
      <div v-if="errors">
          <b-alert variant="danger" show v-for="errorsMail in errors.email" :key="errorsMail.id">
          {{errorsMail}}
          </b-alert>
      </div>
      <div v-else></div>
      </b-form-group>

      <b-form-group id="input-group-2" label="Vaša Lozinka:" label-for="input-2" >
        <b-form-input
          type="password"
          id="input-2"
          :state="errors.password ? false : null"
          v-model="form.password"
          placeholder="Enter password"
           
        ></b-form-input>
        <div v-if="errors">
          <b-alert variant="danger" show v-for="errorsMail in errors.password" :key="errorsMail.id">
           {{errorsMail}}
            </b-alert>
      </div>
      <div v-else></div>
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
        password: '',
      },    
      passwordValidation: null,
      mailValidation: null,
      errors: {}
    }
  },
  methods: {
    ...mapActions(['login']),
    async handleSubmit(){
      await this.login(this.form).then(succ => {

      }).catch(err => {
      this.errors = err.response.data.errors
      });
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
}
form {  
  background-color: lightgray;
  padding:125px 50px;
}

</style>
