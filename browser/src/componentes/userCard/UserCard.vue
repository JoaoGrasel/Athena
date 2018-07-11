<style scoped>
    .no-shrink {
        flex-shrink: 0
    }
</style>

<template>
    <div id="app">
        <v-app id="inspire">
            <v-container fluid>
                <v-flex>
                    <v-layout row wrap>
                        <v-flex v-for="people in newPeople" :key="people.md5" xs12 sm4 md4 mr-4 mb-5>
                            <v-card color="white" class="blue-grey--text elevation-8">
                                <v-container fluid grid-list-lg>
                                    <v-layout row>
                                        <v-flex xs7>
                                            <div>
                                                <div class="headline"><b>{{ people.first_name }} {{ people.surname}}</b></div>
                                                <div><b>Cargo: </b>{{ people.role }}</div>
                                                <div><b>Aniversário: </b>{{ people.birthdate }}</div>
                                                <div><b>Projetos: </b>{{ people.scrums }}</div>
                                            </div>
                                        </v-flex>
                                        <v-flex xs5>
                                            <v-card-media :src="people.picture.large"
                                                          height="125px"
                                                          contain>
                                            </v-card-media>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="blue-grey darken-4"  v-on:click="show_profile"> Visualizar perfil</v-btn>
                                </v-card-actions>
                                <v-slide-y-transition>
                                    <v-card-text v-show="people.show">
                                    </v-card-text>
                                </v-slide-y-transition>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-container>
        </v-app>
    </div>
</template>
<script src="./UserCard.js"></script>
