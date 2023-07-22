import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/login.vue';
import VehiclePage from '../views/vehicle.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/vehicles',
    name: 'Vehicles',
    component: VehiclePage,
  },
];

const router = createRouter({
  history: createWebHistory(), 
  routes,
});

export default router;
