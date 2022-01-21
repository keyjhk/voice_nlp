<template>
  <div id="app">
<!--    <recorders></recorders>-->
    <exercise-simulation></exercise-simulation>
  </div>
</template>

<script>

// import Recorders  from './components/Recorders'
import ExerciseSimulation from "@/views/ExerciseSimulation";
export default {
  name: 'App',
  components: {
    ExerciseSimulation,
    // Recorders,
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
