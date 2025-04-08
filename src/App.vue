<template>
  <div class="app">
    <NavBar />
    <CountriesList />
  </div>
</template>

<script setup>

import CountriesList from './components/CountriesList.vue';
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