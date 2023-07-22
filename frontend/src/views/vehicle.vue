<template>
  <div class="vehicle-list">
    <div class="flex-container">
      <img src="../assets/icons8-car-100.png" alt="car icon">
      <h2 class="vehicle-header">All Vehicles</h2>
    </div>
    <ul class="row">
      <li v-for="vehicle in vehicles" :key="vehicle.id" class="vehicle-item col">
        <div class="car-container">
          <span class="vehicle-num">Vehicle #:{{ vehicle.id }}</span>
          <span class="vehicle-name">{{ vehicle.make.charAt(0).toUpperCase() + vehicle.make.slice(1) }}</span>
          <span class="vehicle-info">{{ vehicle.model }}</span>
          <!-- <span class="vehicle-info">{{ vehicle.year }}</span>
          <span class="vehicle-info">{{ vehicle.colour }}</span> -->
          <span class="vehicle-info">{{ vehicle.location_description }}</span>
        </div>
      </li>
    </ul>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<style>
@import '../assets/css/vehicles.css';
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      vehicles: [],
      errorMessage: '',
    };
  },
  created() {
    // Fetch vehicles from the backend API when the component is created
    this.getVehicles();
  },
  methods: {
    getVehicles() {
      // Retrieve the JWT token from local storage
      const token = localStorage.getItem('token');

      // Add the token to the request headers for authorization
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Send a GET request to the backend to fetch vehicles
      axios
        .get('/api/vehicles')
        .then((response) => {
          this.vehicles = response.data;
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
        });
    },
  },
};
</script>
