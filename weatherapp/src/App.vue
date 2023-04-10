<template>
  <div class="main">
    <Modal v-if="modalOpen" v-on:close-modal="toggleModal" v-bind:APIkey="APIkey"/>
    <Navigation v-on:add-city="toggleModal" v-on:edit-city="toggleEdit" :addCityActive="addCityActive" :isDay="isDay" :isNight="isNight"/>
    <router-view v-bind:cities="cities" v-bind:edit="edit" v-bind:APIkey="APIkey" v-on:is-day="dayTime" v-on:is-night="nightTime" v-on:resetDays="resetDays"/>
  </div>
</template>

<script>
import axios from 'axios'
import db from "./firebase/firebaseinit";
import Navigation from "./components/NavigationBar";
import Modal from "./components/Modal";
export default {
  components: { Navigation, Modal },
  name:"App",
  comments:{
    Navigation,
    Modal
  },
  data(){
    return{
      isDay :null,
      isNight:null,
      APIkey: "3c4fa813706a1e42f0f4e99768f6e62a",
      cities:[],
      modalOpen: null,
      edit:null,
      addCityActive: null,
    };
  },
  created(){
    this.getCityWeather();
    this.checkRoute();
  },
  methods:{
    getCityWeather(){
      let firebaseDB = db.collection('cities');
      firebaseDB.onSnapshot(snap =>{
        //firebase real-time event-listener
        snap.docChanges().forEach(async(doc) =>{
          if(doc.type==='added' && !doc.doc.Nd){
            try{
              const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${doc.doc.data().city}&units=metric&APPID=${this.APIkey}`);
              const data = response.data;
              firebaseDB.doc(doc.doc.id).update({
                currentWeather: data,
              }).then(()=>{
                this.cities.push(doc.doc.data());
              }).then(()=>{
                console.log(this.cities)
              })
            }catch(err){
              console.log(err);
            }
          }else if(doc.type==='added' && doc.doc.Nd){
            this.cities.push(doc.doc.data());
          }else if(doc.type==='removed'){
            this.cities = this.cities.filter(city => city.city!==doc.doc.data().city)
          }
        })
      })
    },
    toggleModal(){
      this.modalOpen=!this.modalOpen;
    },
    toggleEdit(){
      this.edit=!this.edit;
    },
    checkRoute(){
      if(this.$route.name==="AddCity"){
        this.addCityActive = true;
      }else{
        this.addCityActive = false;
      }
      console.log(this.addCityActive);
    },
    dayTime(){
      this.isDay=!this.isDay;
    },
    nightTime(){
      this.isNight=!this.isNight;
    },
    resetDays(){
      this.isDay =false;
      this.isNight=false;
    }
  },
  watch: {
    $route(){
      this.checkRoute();
    }
  }
}
</script>


<style>
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  font-family: "Quicksand",sans-serif;
}
</style>
