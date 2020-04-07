import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import Api from './assets/js/request';
// import Api from './assets/js/api';

import ElementUI from 'element-ui';

import "../theme/index.css";
import 'element-ui/lib/theme-chalk/index.css';

import "./assets/css/main.less";
import i18n from './lang'

import global from "./global.js";

Vue.prototype.$api = Api;
Vue.prototype.$global_msg = global;

Vue.prototype.$ELEMENT = { size: (localStorage.getItem('size') || 'medium'), i18n: (key, value) => i18n.t(key, value) };

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
