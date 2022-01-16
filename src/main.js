import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import 'semantic-ui-css/semantic.min.css'

import SuiVue from 'semantic-ui-vue'
Vue.use(SuiVue)

Vue.config.productionTip = false

const vue = new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')