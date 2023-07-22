<template>
  <div class="form-container">
    <form @submit.prevent="login" class="login-form">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required>

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>

      <button type="submit" class="button">Log In</button>
    </form>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>
<style>
@import '../assets/css/login.css';
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    login() {
      axios
        .post('/api/login', {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          const token = response.data.token;
          // Store the token in local storage for subsequent requests
          localStorage.setItem('token', token);
      
          this.$router.push('/vehicles')
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
        });
    },
  },
};
</script>
