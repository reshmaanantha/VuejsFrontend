import {ref} from 'vue'

const getTodaysDate=()=>{
  
    const dtToday = ref(new Date())
    const maxdate=ref(new Date())

    const month = ref(dtToday.value.getMonth() + 1)
    const day = ref(dtToday.value.getDate())
    const year = ref(dtToday.value.getFullYear())

    if(month.value < 10)
        month.value = '0' + month.value.toString();
    if(day.value < 10)
        day.value = '0' + day.value.toString();

    maxdate.value = year.value + '-' + month.value + '-' + day.value;    
 

  return {maxdate}
  }
  export default getTodaysDate
  