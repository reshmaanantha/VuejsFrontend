  import { ref,reactive } from 'vue'
  import getTodaysDate from './getTodaysDate.js'
  import { getCurrentInstance } from 'vue'
 

  const FieldsValidation=()=>{
    const validFields=reactive({
      //userExists: false,
      isUserIdValid:true,
      isPasswordValid:true,
      isFirstNameValid:true,
      isLastNameValid:true,
      isDobValid:true,
      isEmailValid:true,
      isZipCodeValid:true,
      isPhoneValid:true,
      isCountryValid:true,
      isStateValid:true,
      isCityValid:true,
      isAddressValid:true
  })

    const isValid=ref(true)
    const validPattern=ref('')
    const {maxdate}=getTodaysDate()
    const app = getCurrentInstance()
    const minpwdlength=ref(app.appContext.config.globalProperties.$minpwd)
    const maxpwdlength=ref(app.appContext.config.globalProperties.$maxpwd)
    const minUserId=ref(app.appContext.config.globalProperties.$minUserId)
    const maxUserId=ref(app.appContext.config.globalProperties.$maxUserId)
    const maxName=ref(app.appContext.config.globalProperties.$maxname)
    const maxEmail=ref(app.appContext.config.globalProperties.$maxEmail)
    //const minDate=ref(app.config.globalProperties.$minDate)
    const maxAddress=ref(app.appContext.config.globalProperties.$maxAddress)
    const maxPhone=ref(app.appContext.config.globalProperties.$maxPhone)
  




    const validateFields=(user)=>{
      validFields.isFirstNameValid=validateName(user.firstName)
       validFields.isLastNameValid=validateName(user.lastName)
       validFields.isPasswordValid=validatePassword(user.password)
       validFields.isUserIdValid= validateUserId(user.userId)
       validFields.isDobValid=validateBirthdate(user.dob)
       validFields.isEmailValid= validateEmail(user.email)
       validFields.isZipCodeValid=validateZipcode(user.zipCode)
       validFields.isPhoneValid= validatePhone(user.phoneNumber)
       validFields.isCountryValid=validateCountry(user.country)
       validFields.isStateValid=validateState(user.state)
       validFields.isCityValid=validateCity(user.city)
       validFields.isAddressValid=validateAddress(user.address)
       if(validFields.isFirstNameValid && validFields.isLastNameValid && validFields.isPasswordValid && validFields.isUserIdValid && validFields.isDobValid && validFields.isEmailValid && validFields.isZipCodeValid && validFields.isPhoneValid && validFields.isCountryValid && validFields.isStateValid && validFields.isCityValid &&validFields.isAddressValid )
        return true
        else
        return false
        
    }
    const validateName=(name)=> {
         
      validPattern.value = new RegExp("^(?=.{1,"+maxName.value+"}$)[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$")
      return (validPattern.value.test(name))
      
}
const validateUserId=( name)=> {
   
      validPattern.value = new RegExp("^\\w{"+(minUserId.value) +","+(maxUserId.value)+"}$")
     //validPattern.value = new RegExp("^[A-Za-z]\\w{5,29}$")
      return (validPattern.value.test(name))
 
 /* The username consists of 6 to 30 characters inclusive. If the username
  consists of less than 6 or greater than 30 characters, then it is an inValid username.
  The username can only contain alphanumeric characters and underscores (_). Alphanumeric characters describe the character set consisting of lowercase characters [a – z], uppercase characters [A – Z], and digits [0 – 9].
  The first character of the username must be an alphabetic character, i.e., either lowercase character
  [a – z] or uppercase character [A – Z].
 */
}
const validatePassword= (password)=>{

  if(password.length>=minpwdlength.value && password.length <=maxpwdlength.value )
  return true
  else
  return false
}
const validateEmail=(email)=> {
  validPattern.value = new RegExp("^(?=.{1,"+maxEmail.value+"}$)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$")
  //validPattern.value = new RegExp("^(?=.{1,64}$)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$")
    return (validPattern.value.test(email))
   
}
const validatePhone=(phoneNumber)=> {
   if(phoneNumber.length>maxPhone.value) return false;
   validPattern.value=new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$")
    //validPattern.value=new RegExp("^(\+\\d{1,3}\\s?)?((\(\\d{3}\)\\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?$")
     return (validPattern.value.test(phoneNumber))
 
}
const validateBirthdate=(dob)=>  {

  if(dob > maxdate.value)return false;
   validPattern.value= new RegExp("^(19|20)\\d\\d[-/.](0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])$")
    return (validPattern.value.test(dob)) 
    /*
    Verifies date in dd-mm-yyyy format and date should be in between 1900-2099
    */
}
const validateCountry=(country)=>{
  if(country.length>0)return true;
  else 
  return false;
}
const validateState=(state)=>{
  if(state.length>0)return true;
  else 
  return false;
}
const validateCity=(city)=>{
  if(city.length>0)return true;
  else 
  return false;
}

const validateAddress=(address)=>{
  if(address.length>0 && address.length<maxAddress.value)return true;
  else 
  return false;
}

const validateZipcode=(zipCode)=>  {
  validPattern.value= new RegExp("^[a-zA-Z0-9][a-zA-Z0-9\- ]{0,10}[a-zA-Z0-9]$")
  return (validPattern.value.test(zipCode))  
}
    return {isValid,validFields,validateFields,validateUserId}
  }
  
  
  export default FieldsValidation

 