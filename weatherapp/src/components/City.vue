<template>
  <div class="city">
    <i v-if="edit" @click="removeCity" class="far fa-trash-alt edit" ref="edit"></i>
    <span class="city-name">{{this.city.city}}</span>
    <p>{{this.realFeel}}</p>
    <p>Max: {{this.max_Temp}}&deg; C</p>
    <p>Min: {{this.min_Temp}}&deg; C</p>
    <div class="weather">
      <span>{{Math.round(this.city.currentWeather.main.temp)}}&deg;</span>
      <img :src="require(`../../public/props/conditions/${this.city.currentWeather.weather[0].icon}.svg`)" alt="">
    </div>
    <div class="video">
      <video autoplay loop muted :src="require(`../../public/props/videos/${this.city.currentWeather.weather[0].icon}.mp4`)"></video>
      <div class="bg-overlay"></div>
    </div>
  </div>
</template>

<script>
import db from "../firebase/firebaseinit";
export default {
  name:"city-component",
  props: ['city','edit'],
  created(){
    this.getMinMaxTemp();
    this.getFeel();
  },
  data(){
    return{
      id:null,
      max_Temp:0,
      min_Temp:0,
      realFeel:'',
    }
  },
  methods:{
    removeCity(){
      db.collection('cities').where('city','==',`${this.city.city}`).get().then(docs =>{
        docs.forEach(doc=>{
          this.id = doc.id;
        })
      }).then(()=>{
        db.collection('cities').doc(this.id).delete();
      });
    },
    gotoWeather(e){
      if(e.target===this.$refs.edit){
        //
      }else{
        this.$router.push({name: "Weather",params:{city: this.city.city}});
      }
    },
    getMinMaxTemp(){
      this.max_Temp=this.city.currentWeather.main.temp_max;
      this.min_Temp=this.city.currentWeather.main.temp_min;
    },
    getFeel(){
      this.realFeel=this.city.currentWeather.weather[0].description;
    }
  }
}
</script>

<style>
.city{
  display: flex;
  max-width: 300px;
  height: auto;
  text-align:center;
  position: relative;
  flex-direction: column;
  padding:1.2rem;
  flex-basis: 50%;
  min-height: 13rem;
  color:#fff;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.02);
}

.city > .edit{
  border-radius: 0px 15px 0 0;
  border: 10px solid #2C74B3;
  background-color: #2C74B3;
  z-index:1;
  font-size: 1.3rem;
  position: absolute;
  bottom: 0px;
  left: 0px;
}

.city > span{
  z-index: 1;
  text-transform: capitalize;
  display: block;
  font-size: 2rem;
  font-weight: 800;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}

.city > p{
  z-index: 1;
  text-transform: capitalize;
  display: block;
  font-size: 1rem;
  font-weight: 800;
}

.city > .weather{
  display: flex;
  z-index: 1;
  justify-content: flex-end;
  align-items: flex-end;
  flex:1;
}

.weather > span{
  font-size: 2.2rem;
}

.weather > img{
  height: 3rem;
  width: auto;
  margin-left: 1rem;
}

.city > .video{
  overflow: hidden;
  position: absolute;
  top:0;
  left:0;
  width:100%;
  height: 100%;
}

.video > video{
  height: 100%;
  @media (min-width: 900px) {
    height:auto;
    width:100%;
  }
}

.video > .bg-overlay{
  position: absolute;
  height: 100%;
  width: 100%;
  top:0;
  background-color: rgba(0, 0, 0, 0.2);
}



</style>