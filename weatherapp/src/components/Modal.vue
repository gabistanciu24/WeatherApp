<template>
  <div @click="closeModal" class="modal" ref="modal">
    <div class="modal-wrap" ref="modalWrap">
      <label for="city-name">Enter location:</label>
      <input type="text" name="city-name" placeholder="Add City by Name" v-model="city">
      <button @click="addCity()">Add City</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import db from "../firebase/firebaseinit";
export default {
  name: 'modal-city',
  props: ['APIkey'],
  data(){
    return{
      city:"",
    }
  },
  methods:{
    closeModal(e){
      if(e.target === this.$refs.modal){
        this.$emit('close-modal');
      }
    },
    async addCity(){
      if(this.city === ""){
        alert("Field cannot be empty");
      }else{
        const res=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&APPID=${this.APIkey}`);
        const data= await res.data;
        db.collection('cities').doc().set({
          city: this.city,
          currentWeather: data
        }).then(()=>{
          this.$emit('close-modal');
        })
      }
    }
  }
}
</script>

<style>
.modal{
  z-index:101;
  background: rgba(0,0,0,0.5);
  position:fixed;
  width:100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal > .modal-wrap{
  max-width: 31.25rem;
  border-radius: 8px;
  width:80%;
  padding:1.3rem;
  background-color: #144272;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
}

.modal-wrap > input{
  color:#fff;
  border:none;
  background-color: transparent;
  border-bottom: 1px solid #fff;
  padding: 0.6rem 0.5rem;
  margin: 0.8rem 0 1.3rem;
  width:100%;
}

.modal-wrap input:focus{
  outline:none;
}

.modal-wrap > label{
  color:#fff;
}

.modal-wrap > button{
  background-color:#0A2647;
  color: #fff;
  padding: 0.4rem 1.3rem;
  border-radius: 8px;
  border:none;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
}

</style>