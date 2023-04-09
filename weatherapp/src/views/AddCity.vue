<template>
  <div class="grid">
    <div class="city-link" v-for="(city,index) in cities" v-bind:key="index">
      <City/>
    </div>
  </div>
</template>

<script>
import City from "../components/City"
export default {
  name: 'AddCity',
  props:['cities'],
  created(){
    console.log(this.cities);
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
}

@media (min-width:400px) {
  .grid{
    grid-template-columns: repeat(2,1fr);
  }
  
}
</style>
