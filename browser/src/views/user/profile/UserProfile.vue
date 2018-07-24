<style scoped>

</style>
<!--TODO SE O USUARIO NAO TIVER ADMIN COLOCAR UM BOTAO QUE MOSTRA AS QUESTOES E HORARIOS DELE-->
<!--TODO COLOCAR FOTO-->
<!--TODO ARRUMAR A ESTRUTURA DO CARD-->

<!--TODO COLOCAR O CAMINHO FEITO PELO USUARIO -->
<template>
    <div id="app">
        <v-app id="inspire">
            <v-flex xs12 sm4 md4 mr-4 mb-5>
                <v-card color="white" class="blue-grey--text elevation-8" height="300px" width="300px">
                    <v-container fluid grid-list-lg>
                        <v-layout row>
                            <v-flex xs7 v-if="!edit">
                                <div>

                                    <div class="headline"><b>{{ user.first_name }} {{ user.surname}}</b></div>
                                    <div><b>Cargo: </b>{{ user.role }}</div>
                                    <div><b>Aniversário: </b>18/10/1997</div>
                                    <div><b>Email: </b>batata.ba@tata.com</div>
                                    <div><b>É um administrador: </b> Não</div>
                                    <div><b>Projetos: </b></div>
                                    <div>
                                        <ul>
                                            <li> Pollo </li>
                                            <li> Xunda </li>
                                        </ul>989
                                    </div>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <span class="group pa-2">
                                            <v-btn @click="edit = true">
                                                <v-icon>edit</v-icon>
                                            </v-btn>
                                            <v-btn v-on:click="delete_user">
                                                <v-icon>delete</v-icon>
                                            </v-btn>
                                        </span>
                                    </v-card-actions>
                                </div>
                            </v-flex>

                            <v-flex xs7 v-else>
                                <div>
                                    <v-text-field
                                            v-model="name"
                                            :error-messages="nameErrors"
                                            label="Nome"
                                            required
                                            :readonly="!edit"
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="surname"
                                            :error-messages="surnameErrors"
                                            label="Sobrenome"
                                            :readonly="!edit"
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="role"
                                            :error-messages="roleErrors"
                                            label="Cargo"
                                            :readonly="!edit"
                                    ></v-text-field>
                                    <v-dialog
                                            ref="dialog"
                                            v-model="modal"
                                            :return-value.sync="date"
                                            persistent
                                            lazy

                                            :error-messages="checkboxErrors"                      full-width
                                            width="290px"
                                    >
                                        <v-text-field
                                                slot="activator"
                                                v-model="date"
                                                :error-messages="dateErrors"
                                                label="Data de Nascimento"
                                                prepend-icon="event"
                                                readonly
                                                :readonly="!edit"
                                        ></v-text-field>
                                        <v-date-picker v-model="date" scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="modal = false">Cancelar</v-btn>
                                            <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                                        </v-date-picker>
                                    </v-dialog>
                                    <v-text-field
                                            v-model="email"
                                            :error-messages="emailErrors"
                                            label="E-mail"
                                            :readonly="!edit"
                                    ></v-text-field>
                                    <v-checkbox
                                            v-model="checkbox"
                                            label="O usuario eh administrador?"
                                    />

                                    <!--TODO PERMITIR EDITAR OS -->
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <span class="group pa-2">
                                            <v-btn @click="edit = false">
                                                <v-icon>close</v-icon>
                                            </v-btn>
                                            <v-btn v-on:click="edit_profile" @click="edit = false">
                                                <v-icon>check</v-icon>
                                            </v-btn>
                                        </span>
                                    </v-card-actions>
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

                </v-card>
            </v-flex>
        </v-app>
    </div>

    <!--<v-container fluid fill-height>-->
        <!--<v-layout>-->
            <!--&lt;!&ndash;<div v-for="user in users">&ndash;&gt;-->
            <!--&lt;!&ndash;<UserCard :user="user"></UserCard>&ndash;&gt;-->
            <!--<UserProfile></UserProfile>-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--</v-layout>-->
    <!--</v-container>-->
</template>

<script src="./UserProfile.js"></script>

