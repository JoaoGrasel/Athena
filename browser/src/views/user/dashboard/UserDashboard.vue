<style scoped>

</style>

<template>
    <v-container fluid fill-height>
        <v-layout>
            <v-flex xs12 sm8 md4>
                <v-card>
                    <v-card-actions>
                    </v-card-actions>
                    <v-card-title primary-title>
                        <h3 class="headline mb-0">NOME DO MEMBRO DA EQUIPE AQUI</h3>
                    </v-card-title>
                    <v-card-text>
                    </v-card-text>
                    <v-card-media
                            :src="../../assets/logo-kraken.png"
                            height="150px"
                    >
                    </v-card-media>

                </v-card>
            </v-flex>
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

