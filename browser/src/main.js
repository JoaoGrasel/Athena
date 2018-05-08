import Vuelidate from 'vuelidate';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Router from './routes/Routes';
import Vuetify from 'vuetify'

Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(Vuetify, {
  theme: {
    primary: '#2196f3',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
});



const router = Router.router;
const app = new Vue({
  router,
  render: h => h(App),
}).$mount('#container');
