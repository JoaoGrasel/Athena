import UserCard from '../../../componentes/userCard/UserCard.vue';

export default {
  name: 'App',
  data() {
    return {
      showSpinner: false
    }
  },
  components: {
    UserCard
  },
  computed: {}
  ,
  methods: {
    show_profile:  function () {
      this.$router.replace('/user/profile');
    }
  }
}