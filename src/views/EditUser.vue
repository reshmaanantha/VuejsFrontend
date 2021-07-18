<template>
<form @submit.prevent>
  <!-- User Id is disabled on edit page-->
  <label>UserId:</label>
    <input type="text" required v-model="user.userId" disabled />
    <!-- Show User form component-->
  <UserForm :user="user"  :validFields="validFields"/>
   <!-- Show button to update user -->
    <div class="submit" >
        <button @click.prevent="updateUser">Update User</button>
    </div>
   
</form>
 
</template>

<script>
import UserDataService from '../services/UserDataService.js'
import FieldsValidation from '../composables/FieldsValidation'
import UserForm from '../components/UserForm.vue'
import {ref} from 'vue'
import {useRouter} from  'vue-router'

export default {

    name:'add-user',
    props:['userId'],
    components:{UserForm},
  //Composition API
  setup(props){
      
    const router=useRouter()
    
    //User Entity
    const user= ref({
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
    
  
  //Composables
   const {isValid,validFields,validateFields,validateUserId} =FieldsValidation() 
    
   //Method to update user in Database 
      const updateUser=()=>{
    
    //Validate all the fields
        isValid.value=validateFields(user.value)

      //Update Values into DB only if form fields are valid
      if(isValid.value){
        UserDataService.update(user.userId, user.value) 
        .then(response => {
          //Goto Home page after user data is updated
          router.push({ name: 'Home' })
        })
        .catch(e => {
          console.log(e);
        })
        }
    }
    
//Method to get User data from DB
const getUser=async ()=>{

    //GEt user details from DB only if valid userId is present
    if(props.userId){
    await UserDataService.get(props.userId)
        .then(response => {
            user.value = response.data
                   
     })
        .catch(e => {
          console.log(e);
        })
        //AS form fields value are changed programmatically,trigger change event programmatically
        document.getElementById('country').dispatchEvent(new Event('change'));  
        document.getElementById('state').dispatchEvent(new Event('change')); 

  }
    else{
      //User shouldnt press edit directly,should go to edit through the table only
      router.push({ name: 'Home' })
  }


      }
//Get user details from DB when the edit user page is loaded
  getUser()
    
//Return values   
  return{validFields,isValid,validateFields,updateUser,user,getUser}
  
  }//End of setup

    
}//End of default

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
