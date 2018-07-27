<style lang="scss" scoped>
    .drawer-style {
        color: #3E2723 !important;
    }
</style>

<template>
    <div>
        <v-navigation-drawer
                fixed
                clipped
                app
                v-model="drawer"
        >
            <v-list dense class="drawer-style">
                <template v-for="item in default_items">
                    <v-layout
                            row
                            v-if="item.heading"
                            align-center
                            :key="item.heading"
                    >
                        <v-flex xs6>
                            <v-subheader v-if="item.heading">
                                {{ item.heading }}
                            </v-subheader>
                        </v-flex>
                    </v-layout>
                    <v-list-group
                            v-else-if="item.children"
                            v-model="item.model"
                            :key="item.text"
                            :prepend-icon="item.model ? item.icon : item['icon-alt']"
                            append-icon=""
                    >
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ item.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile
                                v-for="(child, i) in item.children"
                                :key="i"
                                @click=""
                                :to="child.to"
                        >
                            <v-list-tile-action v-if="child.icon">
                                <v-icon class="drawer-style">{{ child.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ child.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>
                    <v-list-tile v-else @click="" :key="item.text" :to="item.to">
                        <v-list-tile-action>
                            <v-icon class="drawer-style">{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ item.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar
                class="primary"
                dark
                clipped-left
                fixed
                app
        >
            <v-toolbar-title style="width: 320px" class="ml-0 pl-3">
                <v-toolbar-side-icon
                        @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <span class="hidden-sm-and-down">Pollo - Controle de Scrum</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="logout">
                <v-icon>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar>
    </div>
</template>
<script src="./Sidenav.js"></script>