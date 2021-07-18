<template>
<header>


      <router-link :to="{name :'Home'}">Home</router-link> 
     <router-link :to="{name :'AddUser'}">New User ?</router-link>
     
      </header>
</template>

<script>

export default {

}
</script>


<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
  }
  header h1 {
    color: #dfdfdf;
    font-size: 48px;
  }
  header a {
    color: #444;
    text-decoration: none;
    margin-left: 20px;
    font-weight: bold;
  }
  
</style>


