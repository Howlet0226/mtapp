import Vue from "vue";
import Vuex from "vuex";
import geo from "./module/geo";
import home from "./module/home";
Vue.use(Vuex);
// nuxt里面规定，这里必须返回一个函数，所以要这样写
const store = () => {
  return new Vuex.Store({
    // 引用vuex的子模块
    modules: {
      geo,
      home
    },
    // 用来触发vuex中的mutations
    actions: {
      //第一个参数为store对象，这样写可以直接接收到store对象里面的commit方法，后面为参数
      //这里的nuxtServerInit方法是nuxt提供的，用来完成服务器渲染,就是一个action，放在actions中，会在服务器渲染前执行。
      //在nuxt框架中，在Nuxt.js中只有page里的组件有fetch和asyncData方法
      //所以当我们使用layout布局页面时如果组件需要请求数据，就无法渲染了，解决方法是在nuxtServerInit方法里初始化组件内的数据
      //这个方法的第二个参数为页面的上下文对象。(我们这里)
      async nuxtServerInit({ commit }, req) {
        // 接受到接口传过来的数据
        const {
          status,
          data: { province, city }
        } = await req.$axios.get("/geo/getPosition");
        // 触发mutations
        commit(
          "geo/setPosition",
          status === 200 ? { city, province } : { city: "", province: "" }
        );
        const {
          status: status2,
          data: { menu }
        } = await req.$axios.get("/geo/menu");
        commit("home/setMenu", status2 === 200 ? menu : []);

        const {
          status: status3,
          data: { result }
        } = await req.$axios.get("/search/hotplace", {
          params: {
            city: "石景山区"
          }
        });
        commit("home/setHotPlace", status3 === 200 ? result : []);
      }
    }
  });
};

export default store;
