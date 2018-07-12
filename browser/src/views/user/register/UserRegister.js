import UserCard from '../../../componentes/userCard/UserCard.vue';
import SIOM from "../../../services/SIOM";
import { validationMixin } from 'vuelidate';
import { required, maxLength, email } from 'vuelidate/lib/validators';


export default {
  name: 'App',
  mixins: [validationMixin],

  validations: {
    name: {required},
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
  },
  components: {},
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Insira um nome!')
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


  //TODO CHAMAR A LÓGICA DE CADASTRO DE USUARIOS
  methods: {
    submit () {
      this.$v.$touch()
    },
  }
}