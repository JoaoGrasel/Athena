<style scoped>
    .no-shrink {
        flex-shrink: 0
    }
</style>
<!--TODO VER COMO COLOCAR PICTURE NO PERFIL, TALVEZ SEJA PRECISO REMODELAR O BANCO PRA SALVAR NO DB-->
<!--TODO PERSONALIZAR O CARTAO-->
<template>
    <div id="app">
        <v-app id="inspire">
            <v-flex xs12 sm4 md4 mr-4 mb-5>
                <v-card color="white" class="blue-grey--text elevation-8" height="300px" width="300px">
                    <v-container fluid grid-list-lg>
                        <v-layout row>
                            <v-flex xs7>
                                <div>
                                    <div class="headline"><b>{{ user.first_name }} {{ user.surname}}</b></div>
                                    <div><b>Cargo: </b>{{ user.role }}</div>
                                    <div><b>Aniversário: </b>{{ user.birthdate }}</div>
                                    <div><b>Projetos: </b>{{ user.scrums }}</div>
                                </div>
                            </v-flex>
                            <v-flex xs5>
                                <v-card-media src="https://www.otvfoco.com.br/wp-content/uploads/2018/02/Ronaldinho-Ga%C3%BAcho.jpg"
                                              height="150px"
                                              contain>
                                </v-card-media>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="blue-grey darken-4"  v-on:click="show_profile"> Visualizar perfil</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-app>
    </div>
</template>
<script src="./UserCard.js"></script>
