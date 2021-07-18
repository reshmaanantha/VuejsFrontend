<template>
<form @submit.prevent>
    
    <label>userId:</label>
    <input type="text" required v-model="user.userId" :maxlength = $maxUserId :placeholder="userIdValidMessage"/>
    <div v-if="!validFields.isUserIdValid" class="error"> {{userIdValidMessage}}</div>

    <button @click.prevent="checkIfAvailable">Check Availability</button> 
    <span  v-bind:class="[userExists ? 'error' : 'noerror']" >{{userExistsresponseMessage}}</span><br/>
 
    <UserForm :user="user"   :validFields="validFields"/>     

    <div class="submit">
        <button @click="saveUser">Create User</button>
    </div>
 
   
    
</form>
   
   
   
</template>

<script>
import UserDataService from '../services/UserDataService.js'
import UserForm from '../components/UserForm.vue'
import { ref ,reactive } from 'vue'
import {useRouter} from  'vue-router'
import FieldsValidation from '../composables/FieldsValidation.js'
import checkAvailability from '../composables/checkAvailablity.js'

export default {
    name:'add-user',
    components:{UserForm},
     data(){ //Options API
      return{
            userIdValidMessage:"Enter "+this.$minUserId+"-"+ this.$maxUserId +" characters.Alphanumeric and Underscore(_) allowed",
      }
     },
    //Composition API
    setup(){

       const user=reactive({
        userId : '',
        password : '',
        firstName : '',
        lastName : '',  
        dob : '', 
        email : '', 
        address : '',
        city : '',
        state : '',  
        zipCode : '',
        country : '',
        phoneNumber : '',
       })
    
    //Router function 
    const router=useRouter()
    
    //Composables           
    const {isValid,validFields,validateFields,validateUserId} =FieldsValidation() 
    const {isAvailable,userExists,userExistsresponseMessage}=checkAvailability()
    
    //Methods
    const  checkIfAvailable=() =>{
         validFields.isUserIdValid= validateUserId(user.userId)
        if(validFields.isUserIdValid){
            console.log(validFields.isUserIdValid)
           isAvailable(user.userId)
           }
        
     }

    
     const saveUser=async()=>{

        isValid.value=validateFields(user)  
        if(isValid.value) {
        let  exist = await isAvailable(user.userId)
        
        //Check if form fields are valid and if user already exists(duplicate user Id).
        //If not only then save the new user  
        if(isValid.value && !exist){
        
                UserDataService.create(user)
                .then(response => {
                user.userId = response.data.userId;
            //Go to Home page after new user is saved
                router.push({ name: 'Home' })
            })
                .catch(e => {
                //Server error 
                console.log(e);
                
            })
        }
        } 
         
        
    }
    //Returning values 
       return {user,isValid,validFields,saveUser,validateFields,checkIfAvailable,userExists,userExistsresponseMessage,isAvailable}    
      
    }    //end of setup

 }//end of export


</script>

<style scoped>
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
input[type="checkbox"]
{
    display:inline-block;
    width:16px;
    margin:0 10px 0 0;
    position:relative;
    top:2px;
    
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

.noerror{
  color: green;
}
.error{
  color: red;
}
</style>
