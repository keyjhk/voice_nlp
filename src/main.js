import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from './utils/request'
import router from './router'

// global css
import './resources/css/axure_rp_page.css';
import './data/styles.css';

Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$http = http;

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
