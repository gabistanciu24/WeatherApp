<template>
  <div class="current-weather">
    <div class="container">
      <div class="weather-info">
        <span class="city">{{this.currentWeather.name}}</span>
        <span class="current-temperature">{{Math.round(this.currentWeather.main.temp)}}</span>
      <div class="high-low-temperatures">
        <div class="high">
          <i class="fas fa-chevron-up"></i>
          <span>{{Math.round(this.currentWeather.main.temp_max)}}&deg;</span>
        </div>
        <div class="low">
          <i class="fas fa-chevron-down"></i>
          <span>{{Math.round(this.currentWeather.main.temp_min)}}&deg;</span>
        </div>
      </div>
      <span class="condition">{{this.currentWeather.weather[0].description}}</span>
      <span class="feels-lie">Fells Like {{Math.round(this.currentWeather.main.feels_like)}}&deg;</span>
    </div>
      <div class="weather-icon">
        <img src="../../public/props/sun.png" alt=""/>
        <img src="../../public//props/moon.png" alt=""/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'CurrentWeather',
  props:["isDay","isNight","currentWeather"],
}
</script>

<style>
.current-weather{
  margin-top: 5.6rem;
  border-bottom: 1px solid rgba(255,255,255,0.7);
}

.current-weather > .container{
  margin: 1.8rem;
  min-height: 22.8rem;
  position:relative;
  display: flex;
  color:white;
}

.current-weather > span{
  display:block;
}

.current-weather > .weather-info{
  padding-top:30px;
  flex:1;
}

.weather-info > .city{
  font-size: 1.5rem;
  font-weight: 500;
}

.weather-info > .current-temperature{
  margin-top: 2.5rem;
  font-size: 5rem;
  font-weight: 600;
}

.high-low-temperatures{
  display: flex;
  gap:1rem;
}

.high,.low{
  display: flex;
}

.high,.low >span{
  margin-left:0.5rem;
}

.condition{
  text-transform: capitalize;
  font-size: 1.5rem;
  font-weight: 500;
  margin: 3.75rem 0 0.5rem 0;
}

.feels-like{
  font-weight: 400;
  font-size: 2.5rem;
}

.weather-icon{
  height: 100%;
  position: absolute;
  right: -11.25rem;
  display: flex;
  align-items: center;
}

.weather-icon > img{
  width: 22.87rem;
  height: 22.87rem;
}
</style>