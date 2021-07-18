import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


const app = createApp(App)
/* Set default min and max length for form fields*/ 
app.config.globalProperties.$allCountries = [] 
app.config.globalProperties.$minUserId=6
app.config.globalProperties.$maxUserId=30
app.config.globalProperties.$minpwd=8
app.config.globalProperties.$maxpwd=15
app.config.globalProperties.$maxname=50
app.config.globalProperties.$maxEmail=64
app.config.globalProperties.$maxAddress=250
app.config.globalProperties.$minDate="1920-07-01"
app.config.globalProperties.$maxPhone=30



app.use(router).mount('#app')

//createApp(App).use(router).mount('#app')
