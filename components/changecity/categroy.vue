<template>
  <div>
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="item in list" :key="item">
        <a :href="'#city-' + item">{{item}}</a>
      </dd>
    </dl>

    <dl v-for="item in block" :key="item.title" class="m-categroy-section">
      <dt :id="'city-' + item.title">{{item.title}}</dt>
      <dd>
        <span v-for=" c in item.city" :key="c">{{c}}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
// 通过汉字获取拼音的模块
import pyjs from "js-pinyin";
export default {
  data() {
    return {
      list: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
      block: []
    };
  },
  async mounted() {
    let self = this;
    let blocks = [];
    let {
      status,
      data: { cities }
    } = await self.$axios.get("/geo/cities");
    if (status == 200) {
      // 用来存首字母拼音的
      let p;
      // 用来存首字母的ask码
      let c;
      // 对象存每个首字母，每个首字母为一个数组，对应着城市
      let d = {};
      let _cities = []; 
       cities.forEach(item =>{
        item.forEach(items=>{
          _cities.push(items)
        })
      })
      console.log(_cities)
      _cities.forEach(item => {
        // 先通过getFullChars获得拼音，然后变为小写以便后面的判断，截取字符串的首字母
        p = pyjs
          .getFullChars(item)
          .toLocaleLowerCase()
          .slice(0, 1);
        c = p.charCodeAt(0);
        if (c > 96 && c < 123) {
          if (!d[p]) {
            d[p] = [];
          }
          if(item!='市辖区'){
                      // 把对应的城市放到对应的首字母里面
          d[p].push(item);
          }
        }
      });
      //Object.entries把一个对象转成一个数组，数组的每一项也是一个数组，存着属性和值
      //在d中每一项的属性名为一个字母,值也为一个数组,所以在循环中,k为一个字母,v为一个数组
      for (let [k, v] of Object.entries(d)) {
        blocks.push({
          // 转为大写
          title: k.toUpperCase(),
          city: v
        })
      }
      // 进行排序
      blocks.sort((a,b)=> a.title.charCodeAt(0) - b.title.charCodeAt(0))
      self.block = blocks
    }
  }
};
</script>
<style lang='scss'>
@import "@/assets/css/changeCity/categroy.scss";
</style>