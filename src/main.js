import Vue from 'vue'
import './cube-ui'
import './index.styl'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import _ from 'lodash'
import store from './vuex/store'
import 'amfe-flexible'
Vue.use(Vuex)

Vue.config.productionTip = false

import * as Common from '_utils/public'

Vue.prototype._ = _

Vue.filter('RechargeState', function(val) {
  let result = '';
  if (val) {
    result = Common.rechargeState(val);
  }
  return result;
})

Vue.filter('AgeState', function(val) {
  let result = '';
  if (val) {
    result = Common.ageState(val);
  }
  return result;
})

/**
 * Date.格式 2019.03.05
 * @param timestamp
 * @returns {string}
 */
Vue.filter('GetYMDDateDecimalString', function(val) {
  let result = '';
  if (val) {
    result = Common.getYMDDateDecimalString(val);
  }
  return result;
})

/**
 * Date.格式 2019.03.28 09:23
 * @param timestamp
 * @returns {string}
 */
Vue.filter('GetYMDHMDateString', function(val) {
  let result = '';
  if (val) {
    result = Common.getYMDHMDateString(val);
  }
  return result;
})

/**
 * Date.格式 2019-03-28
 * @param timestamp
 * @returns {string}
 */
Vue.filter('GetYMDDateString', function(val) {
  let result = '';
  if (val) {
    result = Common.getYMDDateString(val);
  }
  return result;
})

/**
 * Date.格式 04.02 14:20
 * @param timestamp
 * @returns {string}
 */
Vue.filter('GetMDHMDateString', function(val) {
  let result = '';
  if (val) {
    result = Common.getMDHMDateString(val);
  }
  return result;
})

Vue.directive('doc-title', function(el, binding) {
  let title = binding.value;
  if (title === undefined || window.document.title === title) {
    return
  }
  document.title = title;
  let img = el.getAttribute('img-set') || null;
  let mobile = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(mobile)) {
    let iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.setAttribute('src', img || '/favicon.ico');
    iframe.setAttribute('type', '');
    iframe.setAttribute('type', 'image/x-icon');
    let iframeCallback = function() {
      setTimeout(function() {
        iframe.removeEventListener('load', iframeCallback);
        document.body.removeChild(iframe);
      }, 0);
    }
    iframe.addEventListener('load', iframeCallback);
    document.body.appendChild(iframe)
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
