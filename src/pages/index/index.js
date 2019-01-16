import Vue from 'vue'
import App from './App'
import vueLazyload from 'vue-lazyload'
import store from 'src/store'
//import 'src/directive/v-src.js'


Vue.use(vueLazyload);
// Vue.use(vueLazyload, {
//   error: require('assets/images/lazy1.png'),
//   loading: require('assets/images/lazy1.png')
// });

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

if(process.env.NODE_ENV == 'production'){
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/xxx/service-worker.js').then(registration => {
        console.log('SW registered: ', registration)
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError)
      })
    })
  }

}
