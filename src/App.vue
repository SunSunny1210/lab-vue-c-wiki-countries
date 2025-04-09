<template>
  <div class="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script setup>

import NavBar from './components/NavBar.vue';

</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
</style>