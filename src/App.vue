<template>

<header>
  
     <router-link :to="{name :'Home'}">Home</router-link> 
     <router-link :to="{name :'AddUser'}">New User ?</router-link>
     
     </header>
    
    <router-view/>
</template>
<script>
import  Home  from './views/Home.vue'
import Navbar from './components/Navbar.vue'
import countrystatecity from './composables/countrystatecity.js'

export default {
  components:{Home,Navbar},
   //inject:[llcountries'],
  setup(){

    const {countryList,stateList,cityList,loadCountries,updateState,updateCity}=countrystatecity()
    loadCountries()
    
/*    allcountries=ref(countryList)
    console.log(allcountries)*/
  }
}
</script>
<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
/*
#nav a.router-link-exact-active {
  color: #42b983;
}
*/
 header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
  }
</style>
