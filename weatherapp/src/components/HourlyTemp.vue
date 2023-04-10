<template>
  <div class="hour">
    <span>{{new Date(this.time.dt * 1000).toLocaleString("en-us",{hour:'numeric'})}}</span>
    <span>
        <img :src="require(`../../public/props/conditions/${this.time.weather[0].icon}.svg`)" alt="">
    </span>
    <span>{{Math.round(this.time.temp)}}&deg;</span>
  </div>
</template>

<script>
export default {
  name:'HourlyTemp',
  propse:['time'],
}
</script>

<style>
.hour{
    color: white;
    display: flex;
    flex-direction: column;
    text-align: center;
    min-width: 2.8rem;
    margin-right: 1.9rem;
}

img{
    width: auto;
    height:1.3rem;
    display: block;
}

span{
    display: block;
    align-self: center;
}

span:nth-child(1){
    font-weight: 300;
    margin-bottom:0.7rem;
}

span:nth-child(2){
    margin-bottom:0.7rem;
}

span:nth-child(3){
    font-weight: 500;
}
</style>