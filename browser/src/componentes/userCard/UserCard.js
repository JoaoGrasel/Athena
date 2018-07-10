import localForage from "localforage";
import LFM from "../../utils/LocalForageManager";
import UserService from "../../services/userService";

export default {
  mounted() {
    this.addShow()
  },
  methods: {
    addShow: function () {

      this.newPeople = this.people.map(people => (Object.assign(people, {show: false})))
    }
  },
  data(){
    return {
      newPeople: [],
      people: [
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
        }
      ]
    }
  }
}


