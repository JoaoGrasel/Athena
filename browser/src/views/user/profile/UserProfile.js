import SIOM from "../../../services/SIOM";

export default {
  name: 'App',

  mounted() {
    this.get_user()
  },

  data() {
    return {
      profileId: this.$route.params.profileId,
      edit: false,
      success_dialog: false,
      error_dialog: false,
     }
  },
  components: {},
  computed: {
  },
  props: [
    'user'
  ],
  methods: {
    /**
     * Método para entrar no sistema.
     * @returns {Promise<void>}
     */
    show_profile:  function () {
      this.$router.replace('/user/dashboard');
    },
    get_user: async function () {
      try {
        const responseMessage = await SIOM.send('get_user_by_id', this.profileId);
        console.log('response', responseMessage);
        if(responseMessage.response.success){
          this.user = responseMessage.response.data;
        } else {
          console.error('tem que mostrar esse erro', responseMessage.response.data);
        }
      } catch (error) {
        console.log('erro aqui', error);
        this.validate_login = true;
        this.error_message = error.response ? error.response.data.description : "Ocorreu um erro desconhecido.";
      }
    },
    delete_user: async function () {
      try {
        const responseMessage = await SIOM.send('delete_user_by_id', this.profileId);
        console.log('response', responseMessage);
        if(responseMessage.response.success){
          this.users = responseMessage.response.data;
          this.success_dialog = true;
        } else {
          console.error('tem que mostrar esse erro', responseMessage.response.data);
          this.error_dialog = true;
        }
      } catch (error) {
        console.log('erro aqui', error);
        this.validate_login = true;
        this.error_message = error.response ? error.response.data.description : "Ocorreu um erro desconhecido.";
      }
    },
    show_dashboard: function () {
      this.$router.replace('/user/dashboard');
    }

  },
}