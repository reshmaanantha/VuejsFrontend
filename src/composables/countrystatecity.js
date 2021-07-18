import UserDataService from '../services/UserDataService.js'
import { ref } from 'vue'
import { getCurrentInstance } from 'vue'
const countrystatecity=()=>{
  const app = getCurrentInstance()
    const countryList =ref(app.appContext.config.globalProperties.$allCountries)
   const stateList =ref([])
    const cityList =ref([])
  
    const loadCountries=()=>{
     
        
        UserDataService.getCountries()
          .then(response => {
        
            countryList.value=response.data                  
        
            app.appContext.config.globalProperties.$allCountries=response.data
            
                 
         })
          .catch(e => {
            console.log(e);
            
       })
    }
       const updateState=(country)=> {
        cityList.value=([])
       
        if(country.length>0){
         UserDataService.getStates(country)
         .then(response => {
            stateList.value=response.data
            //cityList.value=([])
        })
      
         .catch(e => {
           console.log(e);
           
      })}
     }
 
     const updateCity=(country,state)=>  {
       
        if(country.length>0&&state.length>0){
         UserDataService.getCities(country,state)
         .then(response => {
            cityList.value=response.data
            cityList.value.push("Others")
            
              
        })
         .catch(e => {
           console.log(e);
            alert('Server Error')
      }) 
     }
    }
  


return {countryList,stateList,cityList,loadCountries,updateState,updateCity}
}
export default countrystatecity