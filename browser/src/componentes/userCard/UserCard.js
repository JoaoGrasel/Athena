new Vue({
  el: '#app',
  mounted(){
    this.addShow()
  },
  methods: {
    addShow() {
      this.newPeople = this.people.map(people => ({
        ...people,
        show: false
      }))
    }
  },
  data: () => ({
    newUser: [],
    user: [
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
  })
})