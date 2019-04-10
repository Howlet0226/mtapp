const state = () => ({ position: {} });

const mutations = {
  setPosition(state, val) {
    state.position = val;
  }
};

const actions = {
  setPosition: ({ commit }, position) => {
    commit("setPosition", position);
  }
};
//  vuex中geo模块的完成，设置了namespaced为true以后，是为了避免变量或者函数名的冲突
// 在外面使用的时候就都要加上模块名：
// this.$store.commit("geo/setPosition",userInfo),在第一个参数带上geo这个模块名
// $store.state.geo.position.city 在state后面要加上geo这个模块名
export default { namespaced: true, state, mutations, actions };
