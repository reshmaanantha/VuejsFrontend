<template>
     <label>Password:</label>
    <input type="password" required :maxlength = $maxpwd v-model="user.password" :placeholder="passwordInfo"/>
     <div v-if="!validFields.isPasswordValid" class="error"> {{passwordErrorMessage}}</div>

     <label>First Name:</label>
    <input type="text" required :maxlength = $maxname v-model="user.firstName"/> 
    <div v-if="!validFields.isFirstNameValid" class="error"> {{firstNameValidMessage}}</div>

     <label>Last Name:</label>
    <input type="text" required :maxlength = $maxname v-model="user.lastName"/>
     <div v-if="!validFields.isLastNameValid" class="error"> {{lastNameValidMessage}}</div>

     <label>Birtdate:</label>
    <input type="date" required v-model="user.dob" :min=$minDate :max="maxdate"/>
    <div v-if="!validFields.isDobValid" class="error"> {{dobValidMessage}}</div>
    
      <label>Email:</label>
    <input type="email" :maxlength = $maxEmail required v-model="user.email"/>
     <div v-if="!validFields.isEmailValid" class="error"> {{EmailValidMessage}}</div>
    
    <label>Address:</label><br/>
      <div style="float: left; width: 100%;">
    <textarea :maxlength = $maxAddress required v-model="user.address" style="width: 100%; max-width: 100%;"></textarea>
  </div>
  <div style="clear: both;"></div>
    <div v-if="!validFields.isAddressValid" class="error"> {{addressValidMessage}}</div> 

   <label>Country:</label><br/>
   <div id="country" @change="updateStates">
   <select  required v-model="user.country"  @change="updateStates" >
      <option v-for="country in countryList" :key="country"  :value=country>{{country}}</option>
      </select>
      </div>
     <div v-if="!validFields.isCountryValid" class="error"> {{countryValidMessage}}</div> 
   
    <label>State:</label><br/>
    <div id="state" @change="updateCities">
    <select  required v-model="user.state"  @change="updateCities">
       <option v-for="state in stateList" :key="state" :value=state>{{state}}</option>
    </select>
    </div>
    <div v-if="!validFields.isStateValid" class="error"> {{stateValidMessage}}</div>
    
    <label>City:</label><br/>
        <select required  v-model="user.city" >
      <option v-for="city in cityList" :key="city" :value=city>{{city}}</option>
    </select>
    <div v-if="!validFields.isCityValid" class="error"> {{cityValidMessage}}</div>

    <label>Zipcode:</label>
    <input type="text" required v-model="user.zipCode"/>
    <div v-if="!validFields.isZipCodeValid" class="error"> {{zipCodeValidMessage}}</div>
    
    <label>Phone:</label>
    <input type="tel" required v-model="user.phoneNumber"/>
    <div v-if="!validFields.isPhoneValid" class="error"> {{phoneValidMessage}}</div>
  
</template>

<script>

import getTodaysDate from '../composables/getTodaysDate.js'
import countrystatecity from '../composables/countrystatecity.js'

export default {
    props:['user','validFields'],
    data(){ //Options API
      return{
        passwordInfo:'Use '+this.$minpwd +' -'+ this.$maxpwd +' characters',
        userIdValidMessage:"Enter "+this.$minUserId+"-"+ this.$maxUserId +" characters.Alphanumeric and Underscore(_) allowed",
        passwordErrorMessage: 'Use '+this.$minpwd +' -'+ this.$maxpwd +' characters with a mix of letters, numbers & symbols',
        firstNameValidMessage:'Kindly correct First Name.Max '+this.$maxname+'allowed',
        lastNameValidMessage:'Kindly correct Last Name.Max '+this.$maxname+'allowed',
        dobValidMessage:'Enter correct birthdate',
        EmailValidMessage:'Enter Valid Email',
        zipCodeValidMessage:'Enter Valid Zipcode',
        phoneValidMessage:'Enter Valid Phone number',
        countryValidMessage:"Enter value for country",
        stateValidMessage:"Enter value for state",
        cityValidMessage:"Enter value for city",
        addressValidMessage:"Enter Max "+ this.$maxAddress+ " characters"
        }
    },
    setup(props){ //Composition API
    //Data

    const {countryList,stateList,cityList,loadCountries,updateState,updateCity}=countrystatecity()
   
   //Methods 
      
     const updateStates=()=>{
       
       updateState(props.user.country)
       
     }

      const updateCities=()=>{

        updateCity(props.user.country,props.user.state)
      }
     
    
  //Composables
  const {maxdate}=getTodaysDate()
  //console.log("Length"+countryList.value.length)
  //on component mounted
  if(!countryList.value.length)
  loadCountries()
  

    return{countryList,stateList,cityList,updateState,updateCity,updateStates,updateCities,maxdate,getTodaysDate,loadCountries}
     
    }
  



}


</script>

<style scoped>
.noerror{
  color: green;
}
.error{
  color: red;
}
form{
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
}
label{
    color:#0b6dff;
    display:inline-block;
    margin:25px 0 15px;
    font-size:0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight:bold;
}
input ,select{
    display:block;
    padding:10 px 6 px;
    width:100%;
    box-sizing:border-box;
    border:none;
    border-bottom:1px solid #ddd;
    color:#555;

}

button{
    background:#0b6dff;
    border:0;
    padding:10px 20px;
    margin-top:20px;
    color:white;
    border-radius:20px;

}
.submit{
    text-align:center;
}

</style>
