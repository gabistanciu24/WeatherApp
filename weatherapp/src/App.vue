<template>
  <div class="main">
    <Navigation/>
    <router-view v-bind:cities="cities"/>
  </div>
</template>

<script>
import axios from 'axios'
import db from "./firebase/firebaseinit";
import Navigation from "./components/NavigationBar";
export default {
  components: { Navigation },
  name:"App",
  comments:{
    Navigation
  },
  data(){
    return{
      APIkey: "3c4fa813706a1e42f0f4e99768f6e62a",
      cities:[]
    };
  },
  created(){
    this.getCityWeather();
  },
  methods:{
    getCityWeather(){
      let firebaseDB = db.collection('cities');
      firebaseDB.onSnapshot(snap =>{
        //firebase real-time event-listener
        snap.docChanges().forEach(async(doc) =>{
          if(doc.type==='added'){
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
          }
        })
      })
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
