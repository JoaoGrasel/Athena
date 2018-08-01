<style scoped>

</style>

<!--TODO ESTILIZAR O FORMULARIO - ARRUMAR A ORDEM DOS CAMPOS -->
<!--TODO ARRUMAR PRA COLOCAR FOTO-->
<!-- TODO FAZER FUNCIONAR O CADASTRAR-->
<template>
    <div id="app">
        <v-app id="inspire">
            <v-container fluid>
                <v-flex>
                    <v-card color="white" class="blue-grey--text elevation-8">
                        <v-container>
                            <form>
                                <v-text-field
                                        v-model="first_name"
                                        :error-messages="nameErrors"
                                        label="Nome"
                                        required
                                        @input="$v.first_name.$touch()"
                                        @blur="$v.first_name.$touch()"
                                ></v-text-field>
                                <v-text-field
                                        v-model="surname"
                                        :error-messages="surnameErrors"
                                        label="Sobrenome"
                                        required
                                        @input="$v.surname.$touch()"
                                        @blur="$v.surname.$touch()"
                                ></v-text-field>
                                <v-text-field
                                        v-model="role"
                                        :error-messages="roleErrors"
                                        label="Cargo"
                                        required
                                        @input="$v.role.$touch()"
                                        @blur="$v.role.$touch()"
                                ></v-text-field>
                                <v-select
                                        :items="scrums"
                                        item-text="project_name"
                                        item-value="id"
                                        v-model="e7"
                                        label="Projetos"
                                        multiple
                                        chips
                                        persistent-hint
                                ></v-select>
                                <v-dialog
                                        ref="dialog"
                                        v-model="modal"
                                        :return-value.sync="date"
                                        persistent
                                        lazy

                                                            full-width
                                        width="290px"
                                >
                                    <v-text-field
                                            slot="activator"
                                            v-model="date"
                                            :error-messages="dateErrors"
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
                                        v-model="email"
                                        :error-messages="emailErrors"
                                        label="E-mail"
                                        required
                                        @input="$v.email.$touch()"
                                        @blur="$v.email.$touch()"
                                ></v-text-field>
                                <v-text-field
                                        v-model="username"
                                        :error-messages="usernameErrors"
                                        label="Usuario"
                                        required
                                        @input="$v.username.$touch()"
                                        @blur="$v.username.$touch()"
                                ></v-text-field>
                                <v-text-field
                                        v-model="password"
                                        :append-icon="show1 ? 'visibility_off' : 'visibility'"
                                        :rules="[rules.required]"
                                        :error-messages="passwordErrors"
                                        :type="show1 ? 'text' : 'password'"
                                        label="Senha"
                                        counter
                                        @click:append="show1 = !show1"
                                ></v-text-field>
                                <v-checkbox
                                        v-model="checkbox"
                                        label="O usuario eh administrador?"
                                />
                                <v-btn v-on:click="show_dashboard">Voltar</v-btn>
                                <v-btn v-on:click="create_user">Cadastrar</v-btn>

                                <v-layout row justify-center>
                                    <v-dialog v-model="success_dialog" persistent max-width="290">
                                        <v-card>
                                            <v-card-title class="headline">Usuario cadastrado com sucesso!</v-card-title>
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
                            </form>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-container>
        </v-app>
    </div>

</template>
<script src="./UserRegister.js"></script>