import Login from './views/login/Login.vue';
import Home from './views/home/Home.vue';
import UserDashboard from './views/user/dashboard/UserDashboard.vue';
import UserPerfil from './views/user/profile/UserProfile.vue'

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
  },
  {
    name: 'user-dashboard',
    path: '/user/dashboard',
    component: UserDashboard,
    children: [
      {
        name: 'user-profile',
        path: '/user/dashboard/profile',
        component: UserPerfil,
      },
      {
        name: 'create-user-profile',
        path: '/user/dashboard/create-profile',
        component: UserPerfil,
      },
    ]
  }
];
