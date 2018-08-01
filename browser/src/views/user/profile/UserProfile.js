import SIOM from "../../../services/SIOM";

export default {
  name: 'App',

  created() {
    this.get_user();
    this.get_all_scrums();
  },


    //TODO DAR A POSSIBILIDADE DE RESGATAR O PERFIL DEPOIS DE EXCLUIDO


  data() {
    return {
      profileId: this.$route.params.profileId,
      edit: false,
      delete_success_dialog: false,
      edit_success_dialog: false,
      error_dialog: false,
      modal: false,
      bro: {},
      editedItem: {},
      e7: [],
      scrums:[],
      // first_name: '',
      // surname: '',
      // role: '',
      // email: '',
      // username: '',
      checkbox: false,

      date: this.user.date,
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
    get_all_scrums: async function () {
      try {
        const responseMessage = await SIOM.send('get_all_scrums');
        console.log('response', responseMessage);
        if(responseMessage.response.success){
         this.scrums = responseMessage.response.data;
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
          this.delete_success_dialog = true;
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
    },
    setEditState: function () {
      this.edit = true;
      this.editedItem = Object.assign({}, this.bro);

    },
    edit_user: async function() {
      try {
        const responseMessage = await SIOM.send('edit_user', this.editedItem);
        console.log('response', responseMessage);
        if (responseMessage.response.success) {
          this.bro = responseMessage.response.data;
          this.edit_success_dialog = true;
        } else {
          console.error('tem que mostrar esse erro', responseMessage.response.data);
          this.error_dialog = true;
        }
      } catch (error) {
        console.log('ERRO AQUI MANO', error);
        this.validate_login = true;
        this.error_message = error.response ? error.response.data.description : "Ocorreu um erro desconhecido.";
      }
    }
  },
}