<template>
  <div id="app">
    <recorders></recorders>
  </div>
</template>

<script>

import Recorders  from './components/Recorders'
export default {
  name: 'App',
  components: {
    Recorders,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
