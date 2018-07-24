import UserCard from '../../../componentes/userCard/UserCard.vue';
import SIOM from "../../../services/SIOM";
import { validationMixin } from 'vuelidate';
import { required, maxLength, email } from 'vuelidate/lib/validators';


export default {
  name: 'App',
  mixins: [validationMixin],

  validations: {
    first_name: {required},
    surname: {required},
    role: {required},
    date: {required},
    username: {required},
    password: {required},
    email: {required, email},
  },

  mounted() {},

  data() {
    return {
      success_dialog: false,
      error_dialog: false,
      first_name: '',
      surname: '',
      role: '',
      email: '',
      username: '',
      checkbox: false,
      password: '',
      date: null,
      showSpinner: false,
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      rules: {
        required: value => !!value || 'Required.',
      },
      menu: false,
      modal: false,
      menu2: false,
    }
  },
  components: {},
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.first_name.$dirty) return errors
      !this.$v.first_name.required && errors.push('Insira um nome!')
      return errors
    },
    surnameErrors () {
      const errors = []
      if (!this.$v.surname.$dirty) return errors
      !this.$v.surname.required && errors.push('Insira um sobrenome!')
      return errors
    },
    roleErrors () {
      const errors = []
      if (!this.$v.role.$dirty) return errors
      !this.$v.role.required && errors.push('Insira um cargo!')
      return errors
    },
    dateErrors () {
      const errors = []
      if (!this.$v.date.$dirty) return errors
      !this.$v.date.required && errors.push('Selecione uma data de nascimento!')
      return errors
    },
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('Insira um usuario!')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Insira uma senha!')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Insira um e-mail válido.')
      !this.$v.email.required && errors.push('Insira um e-mail!')
      return errors
    }},

  methods: {
    async create_user() {
      let data_new_user = {
        first_name: this.first_name,
        surname: this.surname,
        role: this.role,
        email: this.email,
        username: this.username,
        checkbox: this.checkbox,
        password: this.password,
        birthdate: this.date,
      };
      try {
        const responseMessage = await SIOM.send('create_user', data_new_user);
        console.log('response', responseMessage);
        if (responseMessage.response.success) {
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
  }
}