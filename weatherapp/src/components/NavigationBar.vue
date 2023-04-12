<template>
  <div>
    <header v-if="addCityActive" class="container add-city" :class="{navDay:isday}">
      <nav>
        <span>Daily Weather</span>
        <div class="options">
          <i @click="addCurrentLocation" class="fa-solid fa-location-crosshairs"></i>
          <i @click="editCities" ref="editCities" class="far fa-edit"></i>
          <i @click="reloadApp" class="fa-sharp fa-solid fa-rotate"></i>
          <i @click="addCity" class="far fa-plus"></i>
        </div>
      </nav>
    </header>
    <header v-else class="container" :class="{day: isDay, night: isNight}">
      <nav>
        <router-link class="router-link" :to="{name: 'AddCity'}">
          <i class="fas fa-plus"></i>
        </router-link>
          <span>
            {{ new Date().toLocaleString("en-us",{weekday: "short"})}},
            {{ new Date().toLocaleString("en-us",{day:"2-digit"})}}
            {{ new Date().toLocaleString("en-us",{month:"short"})}}
          </span>
          <span>&deg; C</span>
      </nav>
    </header>
  </div>
</template>

<script>
import axios from 'axios';
import db from "../firebase/firebaseinit";
export default {
  name: "NavigationBar",
  props: ["addCityActive","isDay","isNight","APIkey"],
  data(){
    return{
      lat:'',
      long:'',
      currentLocation:'',
      isday:false,
      hour:0,
    }
  },
  created(){
    this.addCurrentCity();
    this.getHour();
  },
  methods:{
    addCity(){
      this.$emit("add-city");
    },
    reloadApp(){
      location.reload();
    },
    editCities(){
      this.$refs.editCities.classList.toggle('edit-active');
      this.$emit("edit-city");
    },
    addCurrentCity(){
      const success =(position)=>{
        //console.log(position);
        this.lat=position.coords.latitude;
        this.long=position.coords.longitude;
        //console.log(this.lat);
        //console.log(this.long);
        axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${this.lat}&lon=${this.long}&limit=1&appid=15816ab77b3f29e2f9dc38c800577c3a`)
        .then(
          response=>{
            this.currentLocation=response.data[0].name;
            //console.log(this.currentLocation);
          }
          ).catch(error=>{console.log(error)})
      }
      const error =()=>{
        console.log('error');
      }
      navigator.geolocation.getCurrentPosition(success,error);
    },
    async addCurrentLocation(){
        const res=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.currentLocation}&units=metric&appid=15816ab77b3f29e2f9dc38c800577c3a`);
        const data= await res.data;
        db.collection('cities').doc().set({
          city: this.currentLocation,
          currentWeather: data
        }).then(()=>{
          //
        })
    },
    getHour(){
      let today = new Date();
      this.hour=this.addZero(today.getHours());
      console.log(this.hour);
      if(this.hour >= 7 && this.hour <=23){
        this.isday=!this.isday;
      }
    },
    addZero(num){
      return num<10 ? `0${num}`:num;
    }
  },
};
</script>

<style>
header{
  padding:0 1.2rem;
  z-index:99;
  position:fixed;
  width: 100%;
  -webkit-box-shadow: 0px -2px 14px 2px rgba(0,0,0,0.39);
  -moz-box-shadow: 0px -2px 14px 2px rgba(0,0,0,0.39);
  box-shadow: 0px -2px 14px 2px rgba(0,0,0,0.39);
}
.add-city{
  background-color: #0A2647;
}

header > nav{
  display: flex;
  color: #fff;
  padding: 1.8rem 0;
  justify-content: space-between;
}

.router-link{
  color:#fff;
}

.options > .edit-active{
  color:rgb(210,75,75);
}

.options > i{
  font-size: 1.1rem;
  margin-left: 1rem;
}

span{
  font-weight: 600;
}

.navDay{
  background-color: #F0997D;
}
</style>