import Login from './views/login/Login.vue';
import Home from './views/home/Home.vue';
import UserDashboard from './views/user/dashboard/UserDashboard.vue';
import UserProfile from './views/user/profile/UserProfile.vue';
import UserRegister from './views/user/register/UserRegister.vue';

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
    component: UserDashboard
  },
  {
    name: 'user-profile',
    path: '/user/profile',
    component: UserProfile,
  },
  {
    name: 'create-user-profile',
    path: '/user/create-profile',
    component: UserRegister,
  }


];
