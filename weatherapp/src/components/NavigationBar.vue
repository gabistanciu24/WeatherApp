<template>
  <header class="container add-city">
    <nav>
      <span>Daily Weather</span>
      <div class="options">
        <i @click="editCities" ref="editCities" class="far fa-edit"></i>
        <i @click="reloadApp" class="fa-sharp fa-solid fa-rotate"></i>
        <i @click="addCity" class="far fa-plus"></i>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "NavigationBar",
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
    }
  }
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
  background-color: #313640;
}
header > nav{
  display: flex;
  color: #fff;
  padding: 1.8rem 0;
  justify-content: space-between;
}

.options > .edit-active{
  color:rgb(210,75,75);
}

.options > i{
  font-size: 1.1rem;
}

.options > i:nth-child(2),i:nth-child(3){
  margin-left: 1rem;
}

span{
  font-weight: 600;
}
</style>