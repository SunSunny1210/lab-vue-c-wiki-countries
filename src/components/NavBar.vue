<script setup>
    import { h } from 'vue';

    function NavBar() {
        return h("nav", {class: "nav-bar"}, [
            h("h1", "LAB - WikiCountries")
        ]);
    }
</script>

<template>
    <NavBar />
</template>

<style scoped>
    nav {
        padding-left: 2rem;
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: dodgerblue;
        color: white;
    }
</style>