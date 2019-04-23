<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword"/>
      <categroy :types="types" :areas="areas"/>
      <list :list="list"/>
    </el-col>
  </el-row>
</template>

<script>
import Crumbs from "@/components/products/crumbs.vue";
import Categroy from "@/components/products/categroy.vue";
import List from "@/components/products/list.vue";
export default {
  components: {
    Crumbs,
    Categroy,
    List
  },
  data() {
    return {
      list: [],
      types: [],
      areas: [],
      keyword: "酒店"
    };
  },
  // 框架中pages文件特有的方法，在渲染前获取到数据，实现SSR
  // 每当这个网页被访问的时候，就会执行。
  async asyncData(ctx) {
    // 本来是这样写
    // let keyword = ctx.query.keyword;
    let keyword = '美食'
    let city = ctx.store.state.geo.position.city;
    // let {status,data:{count,pois}} = await ctx.$axios.get('/search/resultsByKeywords',{
    //   params:{
    //     keyword,
    //     city
    //   }
    // })
    let status = 200;
    let pois = [
      {
        type: 123,
        img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555492815584&di=cdd79b1fb68f1f636ff113c47892eeb0&imgtype=0&src=http%3A%2F%2Fhouse-img.xizi.com%2F2018%2F1115%2F15422646204447752822.jpg",
        name: 123,
        comment: 123,
        rate: 123,
        price: 123,
        scene: 123,
        tel: 123,
        status: "可订明日",
        location: 123,
        module: 123
      },
      {
        type: 123,
        img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555492815583&di=05c8251375410c4694add18da84048b3&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F5784602fe412e.jpg",
        name: 123,
        comment: 123,
        rate: 123,
        price: 123,
        scene: 123,
        tel: 123,
        status: "可订明日",
        location: 123,
        module: 123
      },
      {
        type: 123,
        img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555492815583&di=b525d6e6d0f529e6ac69b1012632a8b6&imgtype=0&src=http%3A%2F%2Fftp.jdcq.net%2Fbbs%2Fdata%2Fattachment%2Fforum%2F201409%2F10%2F001120okk9geqwk3ejrxk8.jpg",
        name: 123,
        comment: 123,
        rate: 123,
        price: 123,
        scene: 123,
        tel: 123,
        status: "可订明日",
        location: 123,
        module: 123
      },
      {
        type: 123,
        img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555492815582&di=9b334e19a50dd6b3eb85d5c7e3c6b99e&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1401%2F11%2Fc15%2F30485290_1389447265166_mthumb.jpg",
        name: 123,
        comment: 123,
        rate: 123,
        price: 123,
        scene: 123,
        tel: 123,
        status: "可订明日",
        location: 123,
        module: 123
      },
      {
        type: 123,
        img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555492987967&di=8d3e88fbb32d92892d9c8f19f546b967&imgtype=0&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1506%2F67%2F71e35514fcb85f.jpg_r_480x360x95_222ffb8e.jpg",
        name: 123,
        comment: 123,
        rate: 123,
        price: 123,
        scene: 123,
        tel: 123,
        status: "可订明日",
        location: 123,
        module: 123
      },
      {
        type: 123,
        img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555493031665&di=b207f34c7eb092d49c2a5de09b660ea2&imgtype=0&src=http%3A%2F%2Fi9.hexunimg.cn%2F2014-12-04%2F171106102.jpg",
        name: 123,
        comment: 123,
        rate: 123,
        price: 123,
        scene: 123,
        tel: 123,
        status: "可订明日",
        location: 123,
        module: 123
      },
      {
        type: 123,
        img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555493031665&di=9c9036d0ddaf9a2e39c6e38b1f712710&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160818%2F79c4709530484beab8a177b94bd662af_th.jpg",
        name: 123,
        comment: 123,
        rate: 123,
        price: 123,
        scene: 123,
        tel: 123,
        status: "可订明日",
        location: 123,
        module: 123
      }
    ];

    let {
      status: status2,
      data: { areas, types }
    } = await ctx.$axios.get("/categroy/crumbs", {
      params: {
        city: "大庆"
      }
      
    });
    // console.log(areas.filter(item=>item.type!=='').slice(0,5)[0])
    if (status === 200 && status2 === 200) {
      return {
        // 返回的数据就能够传到相应的data里面
        list: pois.map(item => {
          return {
            type: item.type,
            img: item.img,
            name: item.name,
            comment: Math.floor(Math.random() * 10000),
            rate: 123,
            price: 123,
            scene: item.tag,
            tel: item.tel,
            status: "可订明日",
            location: item.location,
            module: item.type
          };
        }),
        keyword,
        areas: (areas.filter(item=>item.type!=='')[0].slice(0,5)),
        types: (types.filter(item=>item.type!=='')[0].slice(0,5)),
      };
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/products/index.scss";
</style>
