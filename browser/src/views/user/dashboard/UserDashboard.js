import UserCard from '../../../componentes/userCard/UserCard.vue';
import SIOM from "../../../services/SIOM";

export default {
  name: 'App',

  mounted() {
    this.read_all_users()
  },

  data() {
    return {
      users:[],
      showSpinner: false,
      show_deleted: false,
    }
  },
  components: {
    UserCard
  },
  computed: {}
  ,

  methods: {
    read_all_users: async function () {
      try {
        const responseMessage = await SIOM.send('get_all_users');
        console.log('response', responseMessage);
        if(responseMessage.response.success){
          this.users = responseMessage.response.data;
        } else {
          console.error('tem que mostrar esse erro', responseMessage.response.data);
        }
      } catch (error) {
        console.log('erro aqui', error);
        this.validate_login = true;
        this.error_message = error.response ? error.response.data.description : "Ocorreu um erro desconhecido.";
      }
    },
    show_profile:  function () {
      this.$router.replace('/user/profile');
    },

    show_create_profile:  function () {
      this.$router.replace('/user/create-profile');
    },


  }
}