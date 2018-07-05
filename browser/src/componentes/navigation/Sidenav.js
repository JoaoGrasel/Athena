import localForage from "localforage";
import LFM from "../../utils/LocalForageManager";
import UserService from "../../services/userService";

export default {
  methods: {
    go(route) {
      this.active_route = route;
    },
    /**
     * Método para sair do sistema.
     * @returns {Promise<void>}
     */
    logout: async function () {
      try {
        await UserService.doLogout();
        await localForage.removeItem(LFM.getKey('user'));
        this.$router.replace('/');
      } catch (err) {
        console.error(err);
      }
    }
  },
  data() {
    return {
      drawer: false,
      items: [],
      active_route: '',
      default_items: [
        {icon: 'home', text: 'Início'},
        {icon: 'history', text: 'Frequently contacted'},
        {icon: 'content_copy', text: 'Duplicates'},
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Aleatorio',
          model: false,
          children: [
            {icon: 'person_add', text: 'Cadastrar usuário'}
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'More',
          model: false,
          children: [
            {text: 'Import'},
            {text: 'Export'},
            {text: 'Print'},
            {text: 'Undo changes'},
            {text: 'Other contacts'}
          ]
        },
        {icon: 'settings', text: 'Administrativo', to:"/entity/UDESC/management"},
        {icon: 'chat_bubble', text: 'Send feedback'},
        {icon: 'help', text: 'Help'},
        {icon: 'phonelink', text: 'App downloads'},
        {icon: 'keyboard', text: 'Go to the old version'}
      ]
    }
  },
  computed: {
    user() {
      return this.$store.state.user.userInfo
    },
    localeOption: {
      get() {
        return this.$store.state.locale.localeOption;
      },
      set(value) {
        this.$store.commit('updateLocaleOption', value);
      }
    }
  }
}