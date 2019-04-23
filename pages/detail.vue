<template>
  <div class="page-detail">
    <el-row>
      <el-col :span="24">
        <crumbs :keyword="keyword" :type="type"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <Summa :meta="product"/>
      </el-col>
    </el-row>
    <el-row class="m-title">
      <el-col :span="24">
        <h3>商家团购及优惠</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <mylist :list="list"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import mylist from "@/components/detail/mylist.vue";
import Summa from "@/components/detail/summary.vue";
import Crumbs from "@/components/detail/crumbs.vue";

export default {
  data() {
    return {
      keyword: "",
      product: {},
      list: [],
      type: ""
    };
  },
  components: {
    mylist,
    Summa,
    Crumbs
  },
  async asyncData(ctx){
    let { keyword, type } = { keyword: "美食", type: "类型" };
    // let {
    //   status,
    //   data: { product, more: list }
    // } = await ctx.$axios.get("/search/products");
 let {data:{product,more:list}} = await ctx.$axios.get("/search/products");
 console.log(product);
 
    return {
      keyword,
      product:product[0],
      type,
      list
    };


  }
};
</script>

<style lang="scss" >
@import "@/assets/css/detail/index.scss";
</style>