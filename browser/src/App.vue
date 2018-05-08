<style lang="scss">
</style>
<template>
    <div id="container">
        <!--TODO: Se o user estiver logado, mostrar a Toolbar-->
        <div v-if="toolbar">
            <Toolbar></Toolbar>
        </div>
        <router-view></router-view>
    </div>
</template>
<script src="./App.js"></script>