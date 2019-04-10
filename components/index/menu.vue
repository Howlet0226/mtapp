<template>
  <div class="m-menu">
    <!-- 当鼠标移除整个菜单的时候，触发，延迟一点时间然后清除kind，代表取消掉子菜单 -->
    <dl class="nav" @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <!--  根据穿过来的数据来展示 -->
      <!--并绑定了进入事件， 进入一个便把kind的值等于它的type值 -->
      <dd v-for="(item,index) in $store.state.home.menu" :key="index" @mouseenter="enter">
        <!-- 设置图标是哪一个，这是写好的css样式里面的 -->
        <i :class="item.type"/>
        {{item.name}}
        <!--  写好的箭头css样式 -->
        <span class="arrow"/>
      </dd>
    </dl>
    <!-- 根据kind判断要不要弹出子页面 -->
    <!-- sover防止鼠标移除主的菜单页面kind值变为0，不这样就进不去子页面 -->
    <!--  sout就是为kind赋值为空 -->
    <div class="detail" v-if="kind" @mouseenter="sover" @mouseleave="sout">
      >
      <!-- 根据kind值从传来的数据里面寻找到对应的type值，并把它的子数组进行循环展示出来 -->
      <div v-for="(item,index) in curdetail.child" :key="index">
        <h4>{{item.title}}</h4>
        <span v-for="(v,idx) in item.child" :key="idx">{{v}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: ""
    };
  },
  computed: {
    curdetail: function() {
      return this.$store.state.home.menu.filter(item => item.type === this.kind)[0];
    }
  },
  methods: {
    mouseleave: function() {
      let self = this;
      self._timer = setTimeout(function() {
        self.kind = "";
      }, 150);
    },
    enter: function(e) {
      this.kind = e.target.querySelector("i").className;
    },
    sover: function() {
      clearTimeout(this._timer);
    },
    sout: function() {
      this.kind = "";
    }
  }
};
</script>

<style lang='scss'>
@import "~/assets/css/index/index.scss";
</style>
