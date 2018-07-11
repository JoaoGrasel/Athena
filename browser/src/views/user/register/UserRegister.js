import UserCard from '../../../componentes/userCard/UserCard.vue';
import SIOM from "../../../services/SIOM";
import { validationMixin } from 'vuelidate';
import { required, maxLength, email } from 'vuelidate/lib/validators';


export default {
  name: 'App',
  mixins: [validationMixin],

  validations: {
    name: {required, maxLength: maxLength(10)},
    email: {required, email},
    select: {required},
    checkbox: {required},
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
      }
    }
  },
  components: {},
  //todo fazer todos os erros presentes no formulario
  computed: {
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.required && errors.push('You must agree to continue!')
      return errors
    },
    selectErrors () {
      const errors = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('Item is required')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    }},
  methods: {
    submit () {
      this.$v.$touch()
    },
  }
}