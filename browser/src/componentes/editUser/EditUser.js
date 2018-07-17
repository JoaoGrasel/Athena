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
      this.$router.replace('/user/e');
    }
  },
  props: [
    'user',
  ],
  //TODO COLOCAR DADOS DO USUARIO SELECIONADO NAS LABELS QUANDO ENTRAR NA PAGINA
  data(){
    return {
      user: this.user,
      name: '',
      surname:'',
      role:'',
      email: '',
      username:'',
      checkbox: false,
      showSpinner: false,
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      password: '',
      rules: {
        required: value => !!value || 'Required.',
      },
      date: null,
      menu: false,
      modal: false,
      menu2: false
    }
  }
}


