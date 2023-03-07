import Vue from "vue";
// Search 组件中 过渡延时
Vue.directive("delay", {
  inserted: function (el, info) {
    el.style.transitionDelay = info.value + "ms";
  },
});
