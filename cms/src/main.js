import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import * as VueGoogleMaps from "vue2-google-maps"

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: '',
    libraries: 'places',
  }
});

axios.defaults.baseURL = 'http://localhost:3000/api/'

const token = localStorage.getItem('token');
const email = localStorage.getItem('email')

if(token){
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

store.dispatch('get_user',email)
.then(()=>{
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}).catch((error)=>{
  console.error(error)
})


