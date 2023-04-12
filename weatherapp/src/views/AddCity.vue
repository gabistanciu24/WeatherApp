<template>
  <div class="grid" :class="{ gridDay: isDay}">
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
  data(){
    return{
      hour:0,
      isDay:false,
    }
  },
  created(){
    this.getHour();
  },
  components: {
    City
  },
  methods:{
    getHour(){
      let today = new Date();
      this.hour=this.addZero(today.getHours());
      console.log(this.hour);
      if(this.hour >= 7 && this.hour <=23){
        this.isDay=!this.isDay;
      }
    },
    addZero(num){
      return num<10 ? `0${num}`:num;
    }
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

@media (min-width:600px) {
  .grid{
    grid-template-columns: repeat(3,1fr);
  }
}

@media (min-width:900px) {
  .grid{
    grid-template-columns: repeat(4,1fr);
  }
}

@media (min-width:1500px) {
  .grid{
    grid-template-columns: repeat(5,1fr);
  }
}

@media (min-width:1600px) {
  .grid{
    grid-template-columns: repeat(6,1fr);
  }
}

.gridDay{
  background-color: #D3756B;
}
</style>
