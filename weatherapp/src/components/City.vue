<template>
  <div class="city">
    <span>{{this.city.city}}</span>
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
export default {
  name:"city-component",
  props: ['city'],
  created(){
    console.log(this.city.city);
  }
}
</script>

<style>
.city{
  display: flex;
  position: relative;
  flex-direction: column;
  padding:1.2rem;
  flex-basis: 50%;
  min-height: 13rem;
  color:#fff;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
}

.city > span{
  z-index: 1;
  text-transform: capitalize;
  display: block;
  font-size: 1.7rem;
  font-weight: 600;
}

.city > .weather{
  display: flex;
  z-index: 1;
  justify-content: flex-end;
  align-items: flex-end;
  flex:1;
}

.weather > .span{
  font-size: 2.1rem;
  margin-right: 0.5rem;
}

.weather > img{
  height: 1.4rem;
  width: auto;
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