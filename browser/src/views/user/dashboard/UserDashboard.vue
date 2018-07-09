<style scoped>

</style>

<template>
    <v-container fluid fill-height>
        <v-layout>
            <UserCard>"https://codepen.io/typerory/pen/WzmvyV"</UserCard>
        </v-layout>

        <v-snackbar
                color="error"
                :top="true"
                :multi-line="true"
                :timeout="timeout"
                v-model="routeErrorSnackbar"
        >
            Sem autorização para essa rota.
            <v-btn dark flat @click.native="routeErrorSnackbar = false">
                <v-icon>close</v-icon>
            </v-btn>
        </v-snackbar>

    </v-container>
</template>
<script src="./UserDashboard.js"></script>

