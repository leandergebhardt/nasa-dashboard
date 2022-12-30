import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { BBreadcrumb } from 'bootstrap-vue'
import router from './router'
import store from './store'
// import axios from 'axios'
import VueImg from 'v-img';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/global-custom-styles.scss'

// axios.defaults.withCredentials = true

// TODO: add this line to connect with backend
//axios.defaults.baseURL = 'https://some-app.herokuapp.com/api/';

// Handle expired Token
// axios.interceptors.response.use(res => {
//   console.log(`Execution time for: ${res.config.url} - ${ new Date().getTime() - res.config.meta.requestStartedAt} ms`)
//   return res;
// },
// res => {
//   console.error(`Execution time for: ${res.config.url} - ${new Date().getTime() - res.config.meta.requestStartedAt} ms`)
//   throw res;
// });

// (async () => {

//   try {
//     const eightSecondsinMs = 8000;
//     const url = `https://slow-api.onrender.com/api/mock-response-time/${eightSecondsinMs}`;
//     console.log(`Sending a GET reqeust to: ${url}`);
//     const response = await axios.get(url);
//     console.log(`Response: `, response?.data?.message );
//     console.log('do this after you have data');
//   } catch(err) {
//     console.log(`Error message : ${err.message} - `, err.code);
//   }
  
//   console.log('do the next task');
// })();

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueImg);

Vue.component('b-breadcrumb', BBreadcrumb)


Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
