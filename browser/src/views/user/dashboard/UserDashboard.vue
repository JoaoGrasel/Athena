<style scoped>

</style>

<!--TODO COLOCAR O CAMINHO FEITO PELO USUARIO -->

<template>
    <v-container fluid fill-height>
        <v-layout>
            <!--TODO ARRUMAR O POSICIONAMENTO DO BOTAO-->
            <v-btn
                    absolute
                    dark
                    fab
                    right
                    color="pink"
                    v-on:click="show_create_profile"
            >
                <v-icon>add</v-icon>
            </v-btn>
            <div v-for="user in users">
                <div v-if="!user.removed">
                    <UserCard :user="user"></UserCard>
                </div>
            </div>
        </v-layout>

        <!--<v-snackbar-->
                <!--color="error"-->
                <!--:top="true"-->
                <!--:multi-line="true"-->
                <!--:timeout="timeout"-->
                <!--v-model="routeErrorSnackbar"-->
        <!--&gt;-->
            <!--Sem autorização para essa rota.-->
            <!--<v-btn dark flat @click.native="routeErrorSnackbar = false">-->
                <!--<v-icon>close</v-icon>-->
            <!--</v-btn>-->
        <!--</v-snackbar>-->

    </v-container>
</template>
<script src="./UserDashboard.js"></script>

