import SIOM from '../../services/SIOM';
import App from '../../App.vue';
import LFM from "../../utils/LocalForageManager";
import localForage from "localforage";
export default {
  components: {
    App
  },
  methods: {
    /**
     * Método para entrar no sistema.
     * @returns {Promise<void>}
     */
    login: async function () {
      this.validate_login = false;
      try {
        const responseMessage = await SIOM.send('login', this.user);
        console.log('response', responseMessage);
        // this.$store.commit('updateUser', response.data);
        // App.methods.changeSpinnerColor('#2a0845');
        // this.$router.replace('/home');
      } catch (error) {
        console.log('erro aqui', error);
        this.validate_login = true;
        this.error_message = error.response ? error.response.data.description : "Ocorreu um erro desconhecido.";
      }
    }
  },
  data() {
    return {
      user: {
        login: 'admin@admin.com',
        password: 'admin'
      },
      validate_login: false,
      error_message: "",
      rules: {
        // user_not_found: () => !this.data.validate_email || 'Usuário não cadastrado',
        // incorrect_password: () => !this.data.validate_senha || 'Senha incorreta'
      },
      class_login: "input_login",
      osvaldCounter: 0,
      routeErrorSnackbar: false,
      timeout: 4000,
      routeErrorSnackbarText: ''
    }
  },
  watch: {
    validate_login: function () {
      if (this.validate_login) {
        this.class_login = null;
      } else {
        this.class_login = "input_login";
      }
    }
  },
  computed: {
    text() {
      return this.$store.state.locale.localeData ? this.$store.state.locale.localeData.login : null;
    },
    snackbarText() {
      return this.$store.state.locale.localeData ? this.$store.state.locale.localeData.snackbars : null;
    }
  },
  /**
   * Antes de entrar na tela de login:
   *
   * Se o usuário estiver logado, redireciona para
   * a página Home.
   *
   * Se o usuário vem por onError, retira o usuário do
   * constrole de estado e mostra mensagem de erro.
   *
   * Se o usuário vier por logout, apenas entra na página.
   * @param to
   * @param from
   * @param next
   */
  beforeRouteEnter (to, from, next) {
    localForage.getItem(LFM.getKey('user')).then(function (user) {
      if(user !== null) return next('/home');
      next(vm => {
        App.methods.changeSpinnerColor('#fff');
        vm.$store.commit('updateUser', null);
      });
    });
  }
}