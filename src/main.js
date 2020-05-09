import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// import Message from 'element-ui'
import VueLazyload from "vue-lazyload";
import VueCookie from 'vue-cookie'
import ElementUI from 'element-ui';
import qs from 'qs'
import 'element-ui/lib/theme-chalk/index.css';

import 'iview/dist/styles/iview.css';

Vue.prototype.$qs = qs
Vue.prototype.$axios = axios.create({
  baseURL: 'http://localhost:8090/',
  // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})

Vue.config.productionTip = false;

// Vue.use(iView);'

Vue.use(VueCookie);
Vue.use(ElementUI);
Vue.use(VueLazyload, {
  loading: '/imgs/loading-svg/loading-bars.svg'
});


router.beforeEach((to, from, next)=> {
  let isLogin = localStorage.getItem("isLogin");
  isLogin = Boolean(Number(isLogin));

  if(to.meta.requireAuth) {
    if(isLogin){
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

