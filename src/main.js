// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import container from './container'
import App from './App'
import router from './router'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
// Vue.use(ElementUI)
/* eslint-disable no-new */
console.log(123)
// new Vue({
//   el: '#container',
//   router,
//   components: { container },
//   template: '<container/>'
// })
new Vue({
  el: '#App',
  router,
  components: { App },
  template: '<App/>'
})
