import Login from './views/login/Login.vue';
import Home from './views/home/Home.vue';

export default [
  {
    name: 'login',
    path: '/',
    component: Login
  },
  {
    name: 'home',
    path: '/home',
    component: Home
  },
];
