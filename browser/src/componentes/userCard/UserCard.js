import localForage from "localforage";
import LFM from "../../utils/LocalForageManager";
import UserService from "../../services/userService";
import SIOM from "../../services/SIOM";

export default {
  mounted() {
    this.addShow()
  },
  methods: {
    addShow: function () {

      this.newPeople = this.people.map(people => (Object.assign(people, {show: false})))
    },

    /**
     * Método para entrar no sistema.
     * @returns {Promise<void>}
     */
    show_profile:  function () {
      this.$router.replace('/user/profile');
    }
  },
  data(){
    return {
      newPeople: [],
      people: [
        {
          "first_name": "asd",
          "surname": "sur",
          "birthdate": "Thu Jul 03 1970 15:26:53 GMT+0000 (UTC)",
          "role": "Desenvolvedor",
          "scrums": ["5b1698801a49f5071e55fe21"],
          "picture": {
            "large": "https://randomuser.me/api/portraits/men/75.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/75.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
          },
        },
        {
          "first_name": "team_member",
          "surname": "team_member",
          "birthdate": "Thu Jul 03 1970 15:26:53 GMT+0000 (UTC)",
          "role": "Desenvolvedor",
          "scrums": ["5b1698801a49f5071e55fe21"],
          "picture": {
          "large": "https://randomuser.me/api/portraits/men/75.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/75.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
          },
        },
      ]
    }
  }
}


