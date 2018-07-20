import localForage from "localforage";
import LFM from "../../utils/LocalForageManager";
import UserService from "../../services/userService";
import SIOM from "../../services/SIOM";

export default {
  mounted() {},
  methods: {
    /**
     * Método para entrar no sistema.
     * @returns {Promise<void>}
     */
    show_profile:  function () {
      this.$router.replace('/user/dashboard');
    },
    edit_profile: function(){

    },
    delete_user: async function () {
      try {
      const responseMessage = await SIOM.send('delete_user_by_id', this.user.id);
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
    }

  },
  computed: {},
  props: [
    'user',
  ],
  data(){
    return {
      user: this.user,
      edit: false,
      name: '',
      surname:'',
      role:'',
      email: '',
      username:'',
      checkbox: false,
      date: null,
    }
  }
}


