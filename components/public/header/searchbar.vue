<template>
  <div>
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团">
      </el-col>
      <el-col :span="13" class="center">
        <div class="wrapper">
          <el-input
            placeholder="搜索商家或地点"
            v-model="search"
            @focus="focus"
            @blur="blur"
            @input="input"
          />
          <button class="el-button el-button--primary">
            <i class="el-icon-search"/>
          </button>
          <dl class="hotPlace" v-if="isHotplace">
            <dt>热门搜索</dt>
            <dd v-for="(item,index) in  $store.state.home.hotPlace.slice(0,4)" :key="index">
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item.name }}</a>
            </dd>
          </dl>

          <dl class="searchList" v-if="issearchList">
            <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item.name }}</a>
          </dl>
        </div>
        <p class="suggset">
          <a
            v-for="(item,idx) in $store.state.home.hotPlace.slice(0,5)"
            :key="idx"
            :href="'/products?keyword='+encodeURIComponent(item.name)"
          >{{ item.name }}</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="8" class="right">
        <ul class="security">
          <li>
            <i class="refund"></i>
            <p class="txt">随时退</p>
          </li>
          <li>
            <i class="single"></i>
            <p class="txt">不满意免单</p>
          </li>
          <li>
            <i class="overdue"></i>
            <p class="txt">过期退</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入防抖函数的模块
import _ from "lodash";
export default {
  data() {
    return {
      search: "",
      isFocus: false,
      hotplace: [],
      searchlist: []
    };
  },
  computed: {
    isHotplace: function() {
      return this.isFocus && !this.search;
    },
    issearchList: function() {
      return this.isFocus && this.search;
    }
  },

  methods: {
    focus: function() {
      this.isFocus = true;
    },
    blur: function() {
      let self = this;
      setTimeout(function() {
        self.isFocus = false;
      }, 200);
    },
    //延迟函数里面的模块，使用这个函数可以防抖
    input: _.debounce(async function() {
      let self = this;
      // 要把城市里面的市字取消掉，因为数据库没有
      let city = self.$store.state.geo.position.city.replace("市", "");
      self.searchList = [];
      let {
        status,
        data: { top }
      } = await self.$axios.get("/search/top", {
        params: {
          input: self.search,
          city
        }
      });
      // 这里要判断self.search!=''，因为数据库我们使用了正则表达式去匹配，如果不写这个我们删除所有的数据的时候
      // 就会展示所有的数据，又因为防抖，我们输了后面的数据，会过一段时间，才会变
      if (status == 200 && self.search != "") {
        self.searchlist = top.slice(0, 10);
      }
    }, 300)
  }
};
</script>
<style scoped>
</style>
