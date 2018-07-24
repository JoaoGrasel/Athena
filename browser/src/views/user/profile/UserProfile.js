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
      modal: false,
      bro: this.user,
      first_name: '',
      surname: '',
      role: '',
      email: '',
      username: '',
      checkbox: false,
      password: '',
      date: null,
     }
  },
  components: {},
  computed: {
  //   emailErrors () {
  //     const errors = []
  //     if (!this.$v.email.$dirty) return errors;
  //     !this.$v.email.email && errors.push('Insira um e-mail válido.');
  //     return errors
  //   },
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
         this.bro = responseMessage.response.data;
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
        console.log('ERRO AQUI MANO', error);
        this.validate_login = true;
        this.error_message = error.response ? error.response.data.description : "Ocorreu um erro desconhecido.";
      }
    },
    show_dashboard: function () {
      this.$router.replace('/user/dashboard');
    }

  },
}