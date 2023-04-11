<template>
  <div class="grid">
    <div class="city-link" v-for="(city,index) in cities" v-bind:key="index">
      <City v-bind:city="city" v-bind:edit="edit"/>
    </div>
  </div>
</template>

<script>
import City from "../components/City"
export default {
  name: 'AddCity',
  props:['cities','edit'],
  created(){
  },
  components: {
    City
  }
}
</script>

<style>
.grid{
  display: grid;
  padding-top:5rem;
  background-color: #31363d;
  min-height: 100vh;
  grid-auto-rows:13rem;
}

@media (min-width:400px) {
  .grid{
    grid-template-columns: repeat(2,1fr);
  }
  
}
</style>
