<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
import db from "./firebase/firebaseinit";
export default {
  name:"App",
  data(){
    return{
      APIkey: "3c4fa813706a1e42f0f4e99768f6e62a",
      city:'Cluj',
      cities:[]
    };
  },
  created(){
    this.getCityWeather();
  },
  methods:{
    getCityWeather(){
      let firebaseDB = db.collection('cities');
      firebaseDB.onSnaphot(snap =>{
        //firebase real-time event-listener
        snap.docChanges().forEach(async(doc) =>{
          console.log(doc);
        })
      })
    },
    getCurrentWeather(){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&APPID=${this.APIkey}`).then(res =>{
        console.log(res.data);
      });
    },
  },
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
