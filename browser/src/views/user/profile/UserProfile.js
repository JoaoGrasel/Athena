import UserProfile from '../../../componentes/userProfile/UserProfile.vue';
import SIOM from "../../../services/SIOM";

export default {
  name: 'App',

  mounted() {},

  data() {
    return {
        profileId: this.$route.params.profileId
     }
  },
  components: {
    UserProfile
  },
  computed: {
  },

  methods: {}
}