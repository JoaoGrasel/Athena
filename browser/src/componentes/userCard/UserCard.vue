<style scoped>
    .no-shrink {
        flex-shrink: 0
    }
</style>
<!--TODO VER COMO COLOCAR PICTURE NO PERFIL, TALVEZ SEJA PRECISO REMODELAR O BANCO PRA SALVAR NO DB-->
<!--TODO PERSONALIZAR O CARTAO-->
<template>
    <v-container>
            <v-card color="brown lighten-3" class="black--text elevation-8" height="300px" width="450px">
                <v-container>
                    <v-layout>
                        <v-flex>
                            <div>
                                <div class="headline"><b>{{ user.first_name }} {{ user.surname}}</b></div>
                                <div><b>Cargo: </b>{{ user.role }}</div>
                                <div><b>Projetos: </b></div>
                                <div v-for="scrum in user.scrums">
                                    <p>{{ scrum.project_name }}</p>
                                </div>
                                <div>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="blue-grey darken-4"  v-on:click="show_profile"> Visualizar perfil</v-btn>
                                    </v-card-actions>
                                </div>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
    </v-container>
</template>
<script src="./UserCard.js"></script>
