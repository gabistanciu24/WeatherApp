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
.city-link{
  text-align: center;
}
.grid{
  display: grid;
  padding-top:5rem;
  background-color: #144272;
  min-height: 100vh;
  grid-auto-rows:13rem;
  gap:0.5rem; 
}

@media (min-width:400px) {
  .grid{
    grid-template-columns: repeat(2,1fr);
  }
}

@media (min-width:800px) {
  .grid{
    grid-template-columns: repeat(3,1fr);
  }
}

@media (min-width:1200px) {
  .grid{
    grid-template-columns: repeat(4,1fr);
  }
}

@media (min-width:1600px) {
  .grid{
    grid-template-columns: repeat(5,1fr);
  }
}
</style>
