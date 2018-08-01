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
                            <v-flex xs7>

                                <!--TODO PERMITIR A RECUPERAÇAO DE USUARIO-->
                                <v-btn v-if="removed" v-on:click="" @click="">Recuperar usuario</v-btn>

                                <div class="headline"><b>{{ bro.first_name }} {{ bro.surname}}</b></div>
                                <div><b>Cargo: </b>{{ bro.role }}</div>
                                <div><b>Aniversário: </b>{{ bro.birthdate }}</div>
                                <div><b>Email: </b>{{ bro.email }}</div>
                                <!--TODO VER COMO CITAR O DISCRIMINANTE-->
                                <div><b>É um administrador: </b> </div>
                                <div><b>Projetos: </b></div>
                                <div>
                                    <ul>
                                        <li v-for="scrum in bro.scrums"> {{ scrum.project_name }}  </li>
                                    </ul>
                                </div>

                                <v-card-actions v-if="!removed">
                                    <v-spacer></v-spacer>
                                    <span class="group pa-2">
                                        <v-btn @click="setEditState">
                                            <v-icon>edit</v-icon>
                                        </v-btn>
                                        <v-btn v-on:click="delete_user">
                                            <v-icon>delete</v-icon>
                                        </v-btn>
                                    </span>
                                </v-card-actions>
                            </v-flex>

                            <v-dialog v-model="edit">
                                <v-card>
                                    <v-text-field
                                            v-model="editedItem.first_name"
                                            label="Nome"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="editedItem.surname"
                                            label="Sobrenome"
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="editedItem.role"
                                            label="Cargo"
                                    ></v-text-field>
                                    <v-dialog
                                            ref="dialog"
                                            v-model="modal"
                                            :return-value.sync="date"
                                            persistent
                                            lazy
                                            width="290px"
                                    >
                                        <v-text-field
                                                slot="activator"
                                                v-model="editedItem.birthdate"
                                                label="Data de Nascimento"
                                                prepend-icon="event"
                                                readonly
                                        ></v-text-field>
                                        <v-date-picker v-model="date" scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="modal = false">Cancelar</v-btn>
                                            <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                                        </v-date-picker>
                                    </v-dialog>
                                    <v-text-field
                                            v-model="editedItem.email"
                                            label="E-mail"
                                    ></v-text-field>
                                    <v-checkbox
                                            v-model="editedItem.type === 'admin'"
                                            label="O usuario eh administrador?"
                                    />
                                    <v-btn @click="show_remove_scrums = true"> Remover Projetos</v-btn>
                                    <v-btn @click="show_add_scrums = true"> Adicionar Projetos</v-btn>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <span class="group pa-2">
                                            <v-btn @click="edit = false">
                                                <v-icon>close</v-icon>
                                            </v-btn>
                                            <v-btn v-on:click="edit_user" @click="edit = false">
                                                <v-icon>check</v-icon>
                                            </v-btn>
                                        </span>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-layout>

                        <v-dialog v-model="show_add_scrums" persistent max-width="290">
                            <v-card>
                                <v-card-title class="headline">Adicionar Projetos</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <span class="group pa-2">
                                            <v-btn @click="show_add_scrums = false">
                                                <v-icon>close</v-icon>
                                            </v-btn>
                                            <v-btn v-on:click="" @click="show_add_scrums = false">
                                                <v-icon>check</v-icon>
                                            </v-btn>
                                        </span>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <v-dialog v-model="show_remove_scrums" persistent max-width="290">
                            <v-card>
                                <v-card-title class="headline">Remover Projetos</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <span class="group pa-2">
                                            <v-btn @click="show_remove_scrums = false">
                                                <v-icon>close</v-icon>
                                            </v-btn>
                                            <v-btn v-on:click="edit_user" @click="show_remove_scrums = false">
                                                <v-icon>check</v-icon>
                                            </v-btn>
                                        </span>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <v-layout row justify-center>
                            <v-dialog v-model="edit_success_dialog" persistent max-width="290">
                                <v-card>
                                    <v-card-title class="headline">Usuario editado com sucesso!</v-card-title>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="green darken-1" flat v-on:click="show_dashboard">Ok</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-layout>
                        <v-layout row justify-center>
                            <v-dialog v-model="delete_success_dialog" persistent max-width="290">
                                <v-card>
                                    <v-card-title class="headline">Usuario deletado com sucesso!</v-card-title>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="green darken-1" flat v-on:click="show_dashboard">Ok</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-layout>
                        <v-layout row justify-center>
                            <v-dialog v-model="error_dialog" persistent max-width="290">
                                <v-card>
                                    <v-card-title class="headline">Ops, parece que ocorreu algum erro :/</v-card-title>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="green darken-1" flat v-on:click="show_dashboard">Ok</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
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

