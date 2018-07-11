<style scoped>

</style>
<template>
    <div id="app">
        <v-app id="inspire">
            <v-container fluid>
                <v-flex>
                    <v-card color="white" class="blue-grey--text elevation-8">
                        <v-container>
                            <form>
                                <v-text-field
                                        v-model="name"
                                        :error-messages="nameErrors"
                                        label="Nome"
                                        required
                                        @input="$v.name.$touch()"
                                        @blur="$v.name.$touch()"
                                ></v-text-field>
                                <v-text-field
                                        v-model="surname"
                                        :error-messages="surnameErrors"
                                        label="Sobrenome"
                                        required
                                        @input="$v.name.$touch()"
                                        @blur="$v.name.$touch()"
                                ></v-text-field>
                                <v-text-field
                                        v-model="role"
                                        :error-messages="roleErrors"
                                        label="Cargo"
                                        required
                                        @input="$v.name.$touch()"
                                        @blur="$v.name.$touch()"
                                ></v-text-field>
                                <v-menu
                                        ref="menu"
                                        :close-on-content-click="false"
                                        v-model="menu"
                                        :nudge-right="40"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        min-width="290px"
                                >
                                    <v-text-field
                                            slot="activator"
                                            v-model="date"
                                            label="Data de Nascimento"
                                            prepend-icon="event"
                                            readonly
                                    ></v-text-field>
                                    <v-date-picker
                                            ref="picker"
                                            v-model="date"
                                            :max="new Date().toISOString().substr(0, 10)"
                                            min="1950-01-01"
                                            @change="save"
                                    ></v-date-picker>
                                </v-menu>
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
                                        @input="$v.name.$touch()"
                                        @blur="$v.name.$touch()"
                                ></v-text-field>
                                <v-text-field
                                        v-model="password"
                                        :append-icon="show1 ? 'visibility_off' : 'visibility'"
                                        :rules="[rules.required]"
                                        :type="show1 ? 'text' : 'password'"
                                        label="Senha"
                                        counter
                                        @click:append="show1 = !show1"
                                ></v-text-field>
                                <v-checkbox
                                        v-model="checkbox"
                                        :error-messages="checkboxErrors"
                                        label="O usuario eh administrador?"
                                        required
                                        @change="$v.checkbox.$touch()"
                                        @blur="$v.checkbox.$touch()"
                                ></v-checkbox>

                                <v-btn @click="submit">Cadastrar</v-btn>
                            </form>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-container>
        </v-app>
    </div>
</template>
<script src="./UserRegister.js"></script>