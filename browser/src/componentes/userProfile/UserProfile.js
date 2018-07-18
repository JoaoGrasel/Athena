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


