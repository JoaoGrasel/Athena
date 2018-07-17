<style scoped>

</style>

<!--TODO SE O USUARIO NAO TIVER ADMIN COLOCAR UM BOTAO QUE MOSTRA AS QUESTOES E HORARIOS DELE-->
<!--TODO COLOCAR FOTO-->
<!--TODO ARRUMAR A ESTRUTURA DO CARD-->
<template>
    <div id="app">
        <v-app id="inspire">
            <v-flex xs12 sm4 md4 mr-4 mb-5>
                <v-card color="white" class="blue-grey--text elevation-8" height="300px" width="300px">
                    <v-container fluid grid-list-lg>
                        <v-layout row>
                            <v-flex xs7 v-if="!edit">
                                <div>

                                    <!--<div class="headline"><b>{{ user.first_name }} {{ user.surname}}</b></div>-->
                                    <div class="headline"><b>João Grasel</b></div>

                                    <!--<div><b>Cargo: </b>{{ user.role }}</div>-->
                                    <div><b>Cargo: </b>Desenvolvedor</div>
                                    <div><b>Aniversário: </b>18/10/1997</div>
                                    <div><b>Email: </b>batata.ba@tata.com</div>
                                    <div><b>É um administrador: </b> Não</div>
                                    <div><b>Projetos: </b></div>
                                    <div>
                                        <ul>
                                            <li> Pollo </li>
                                            <li> Xunda </li>
                                        </ul>
                                    </div>

                                </div>
                            </v-flex>

                            <v-flex xs7 v-else>
                                <div>

                                    <!--<div class="headline"><b>{{ user.first_name }} {{ user.surname}}</b></div>-->
                                    <!--<input class="headline"><b>João Grasel</b></input>-->
                                    <v-text-field
                                            v-model="name"
                                            :error-messages="nameErrors"
                                            label="Nome"
                                            required
                                            :readonly="!edit"
                                    ></v-text-field>
                                    <!--<div><b>Cargo: </b>{{ user.role }}</div>-->
                                    <div><b>Cargo: </b>Desenvolvedor</div>
                                    <div><b>Aniversário: </b>18/10/1997</div>
                                    <div><b>Email: </b>batata.ba@tata.com</div>
                                    <div><b>É um administrador: </b> Não</div>
                                    <div><b>Projetos: </b></div>
                                    <div>
                                        <ul>
                                            <li> Pollo </li>
                                            <li> Xunda </li>
                                        </ul>
                                    </div>

                                </div>
                            </v-flex>
                            <!--<v-flex xs5>-->
                            <!--<v-card-media :src="user.picture.large"-->
                            <!--height="125px"-->
                            <!--contain>-->
                            <!--</v-card-media>-->
                            <!--</v-flex>-->
                        </v-layout>
                    </v-container>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                          <span class="group pa-2">
                            <v-btn @click="edit = true">
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn v-on:click="show_profile">
                                <v-icon>delete</v-icon>
                            </v-btn>
                          </span>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-app>
    </div>
</template>

<script src="./UserProfile.js"></script>
