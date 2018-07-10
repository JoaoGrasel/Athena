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
        {icon: 'home', text: 'Início', to:"/home"},
        {icon: 'account_circle', text: 'Meu Perfil'},
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Equipe',
          model: false,
          children: [
            {icon: 'people', text: 'Visão Geral', to:"/user/dashboard"},
            {icon: 'person_add', text: 'Cadastrar Usuário'},
            {icon: 'access_time', text: 'Visualizar Horários'},
            {icon: 'access_time', text: 'Visualizar Questões Diárias'},
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Projetos',
          model: false,
          children: [
            {icon: 'assessment', text: 'Visão Geral'},
            {icon: 'create', text: 'Cadastrar Projeto'}
          ]
        },
        {icon: 'settings', text: 'Confirgurações', to:"/entity/UDESC/management"}
      ]
    }
  },
  computed: {
    user() {
      return this.$store.state.user.userInfo
    }
  }
}