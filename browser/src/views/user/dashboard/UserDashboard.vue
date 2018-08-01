<style scoped>

</style>

<!--TODO COLOCAR O CAMINHO FEITO PELO USUARIO -->
<!--TODO FAZER UMA AREA DE USUARIOS EXCLUIDOS COM A OPCAO DE RESTAURAR.-->
<!--TODO ARRUMAR O POSICIONAMENTO DOS CARDS-->
<!--TODO ARRUMAR O POSICIONAMENTO DO BOTAO-->

<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>

            <v-flex v-if="!show_deleted" xs3>
                <v-btn @click="show_deleted = true"> Mostrar usuarios deletados
                </v-btn>

                <div v-for="user in users" :key="user.id">
                    <div v-if="!user.removed">
                        <UserCard :user="user"></UserCard>
                    </div>
                </div>
            </v-flex>

            <v-flex v-if="show_deleted" xs3>
                <v-btn @click="show_deleted = false"> Mostrar usuarios ativos
                </v-btn>

                <div v-for="user in users" :key="user.id">
                    <div v-if="user.removed">
                        <UserCard :user="user"></UserCard>
                    </div>
                </div>
            </v-flex>




            <!--<v-btn-->
                    <!--absolute-->
                    <!--dark-->
                    <!--fab-->
                    <!--right-->
                    <!--color="pink"-->
                    <!--v-on:click="show_create_profile"-->
                <!--&gt;-->
                    <!--<v-icon>add</v-icon>-->
                <!--</v-btn>-->



        </v-layout>
    </v-container>
</template>
<script src="./UserDashboard.js"></script>

