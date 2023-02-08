
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import * as filters from './filters.js'
import { baseUrl } from './pages/api/index.js'

Vue.config.productionTip = false
// Vue.prototype.$baseUrl="http://170.106.8.145:3000"  //线上接口
Vue.prototype.$baseUrl = baseUrl  //线上接口


Object.keys(filters).forEach(key => {
	console.log('key',key,filters[key]);
  Vue.filter(key, filters[key])
})

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif