import Login from './views/login/Login.vue';
import Home from './views/home/Home.vue';
import UserDashboard from './views/user/dashboard/UserDashboard.vue';

export default [
  {
    name: 'login',
    path: '/',
    component: Login
  },
  {
    name: 'home',
    path: '/home',
    component: Home,
    children: [
      {
        name: 'piroca',
        path: '/home/piroca',
        component: Home,
        children: []
      }
    ]
  },
  {
    name: 'user-dashboard',
    path: '/user/dashboard',
    component: UserDashboard
  },
];
