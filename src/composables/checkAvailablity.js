import UserDataService from '../services/UserDataService.js'
import { ref } from 'vue'
const checkAvailability=()=>{
    const userExistsresponseMessage = ref('')
    const userExists=ref(false)

    const isAvailable = async(userId)=>{   
        if(!userId.length){
          userExistsresponseMessage.value="User ID shouldnt be empty"
          return false;
        }
        
        await UserDataService.checkAvailability(userId)
        .then(response => {
          
          userExists.value=response.data
          if(response.data){
            userExistsresponseMessage.value="User ID not available"
          
        }
          else{
            userExistsresponseMessage.value="User ID  is available"
          
        }
   
      }).catch(e => {
          console.log(e);
          alert('Server Error')
    })

  return userExists.value
}

return { isAvailable,userExists,userExistsresponseMessage}

}
 export default checkAvailability