import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from './utils/request'

Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$http = http;

new Vue({
    render: h => h(App),
}).$mount('#app')
