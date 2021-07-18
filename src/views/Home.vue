<template>
   <div v-if="!error">
  <div class="home">
    <h2>List of Registered Users</h2>
   
    
  <div v-if="usersAvailable">
        <div v-if="users.length">
          <table style="width:100%">
            <tr>
              <th>UserId</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>DOB</th>
              <th>Email</th>
              <th>Address</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Zipcode</th>
              <th>Phone</th>
            </tr>
          
            <tr v-for="user in users" :key="user">
              <td>{{user.userId}}</td>
              <td>{{user.firstName}}</td>
              <td>{{user.lastName}}</td>
              <td>{{user.dob}}</td>
              <td>{{user.email}}</td>
              <td>{{user.address}}</td>
              <td>{{user.country}}</td>
              <td>{{user.state}}</td>
              <td>{{user.city}}</td>
              <td>{{user.zipCode}}</td>
              <td>{{user.phoneNumber}}</td>

            <!-- Edit particular user from table-->
              <td><router-link :to="{name :'EditUser' ,params: {userId:user.userId}}"><button>Edit</button></router-link></td>
                
              <td><button @click="deleteuser(user.userId)">Delete</button></td>      
            </tr>     
          </table> 
        </div>
        <div v-else>
          <h3> No Users in Database</h3>
        </div>
      
     </div>
<!-- end of users.available-->
    <div v-else>
  <!--Show spinner until data is retrieved from DB -->
          <Spinner/>
    </div>
  
  </div> <!-- end of error-->
 </div>
 <div v-else>
   <h3> Network error </h3>
   </div>
</template>

<script>
import UserDataService from '../services/UserDataService.js'
import Spinner from '../components/Spinner.vue'



export default {
  name: 'Home',
  components :{Spinner} ,
  data(){
    return{
    users:[],
    error:false,
    usersAvailable:false

  //  addorupdate:false
  //add:false
    }
  },
  methods:{
    //Options API
    retrieveUsers(){
      //Get all users Data to display in the table
     UserDataService.getAll()
        .then(response => {
          this.users = response.data;
          this.usersAvailable=true
      })
        .catch(e => {
          this.usersAvailable=true
          if(e.request){ //no response from server
             this.error=true
          }
          console.log(e);
         
        })
    },
    //Delete user based on user Id
    deleteuser(userId)
    {
      //Confirm from user if they want to delete the user or not
         var retVal = confirm("Do you want to delete ?");
          if( retVal == true ) {
            //Delete from db only on confirmation 
          UserDataService.delete(userId)
        .then(response => {
          const userid = this.users.findIndex(p => p.userId === userId)
          this.users.splice(userid, 1)
          
        })
        .catch(e => {
          console.log(e);
        });
    }
    }
    
  },
  mounted(){
    this.retrieveUsers()
  }
  
}
</script>

