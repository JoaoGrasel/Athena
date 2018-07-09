<style lang="scss">
    .footer-class {
        background-color: transparent !important;
    }

    .toggle-custom-button {
        margin-bottom: 15px;
        margin-right: 10px;
        background-color: transparent !important;
    }
    .toggle-custom-button-mobile {
      display: none;
    }

    /**
     Layout mobile.
   */
    @media screen and (max-width: 767px){
        .footer-class {
            display: none;
        }
        .toggle-custom-button-mobile {
          display: flex;
          background-color: transparent !important;
        }
    }
    /***/
</style>
<template>
    <v-app id="container">
        <Toolbar v-if="user"></Toolbar>
        <v-content>
            <router-view :user="user"></router-view>
        </v-content>
        <v-footer fixed class="footer-class">
            <v-spacer></v-spacer>
            <div v-show="showSpinner" class="lds-ellipsis">
                <div id="localeSpinner1"></div>
                <div id="localeSpinner2"></div>
                <div id="localeSpinner3"></div>
                <div id="localeSpinner4"></div>
            </div>
            <!--<v-btn-toggle v-show="!showSpinner" mandatory v-model="localeOption"-->
                          <!--class="toggle-custom-button">-->
                <!--<v-btn flat value="pt-Br">-->
                    <!--<span style="color: #009b36">PT-</span><span-->
                        <!--style="color: #ead112">BR</span>-->
                <!--</v-btn>-->
                <!--<v-btn flat value="en">-->
                <!--<span style="color: #d9221e">E</span><span-->
                <!--style="color: #3c81b3">N</span>-->
                <!--</v-btn>-->
            <!--</v-btn-toggle>-->
        </v-footer>
    </v-app>
</template>
<script>

  import Toolbar from './componentes/navigation/Sidenav.vue';
  import LFM from "./utils/LocalForageManager";
  import localForage from 'localforage';
  import OpenService from './services/openService';

  export default {
    name: 'App',
    data() {
      return {
        showSpinner: false
      }
    },
    components: {
      Toolbar
    },
    computed: {
      user() {
        return this.$store.state.user.userInfo
      }
    },
    methods: {
      /**
       * @author Bernardo Schveitzer
       * Modifica a cor do spinner dependendo da cor de fundo da tela.
       * @param colorCode
       */
      changeSpinnerColor: function (colorCode) {
        for (let index = 1; index < 5; index++) {
          document.getElementById(`localeSpinner${index}`).style.background = colorCode;
        }
      }
    },
    mounted() {
      /**
       * @author Bernardo Schveitzer
       * Inicializa as informações do sistema no controle de estado.
       */
      this.$nextTick(async function () {
        try {
          this.$store.commit('initUser', await localForage.getItem(LFM.getKey('user')));
        }catch (err) {
          console.error(err);
          // window.alert("Ocorreu um erro desconhecido, tente novamente.");
        }
      })
    }
  }
</script>