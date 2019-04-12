<template>
<el-container class="layout-default">
  <el-header style="height:197px"><my-header/></el-header>
  <el-main><nuxt/></el-main>
  <el-footer height="100%"><myfooter/></el-footer>
</el-container>

</template>

  <script>
  import myHeader from '@/components/public/header/index.vue';
  import myfooter from '@/components/public/footer/index.vue'
  export default {
    components:{
      myHeader,
      myfooter
    }
  }
  </script>
<style lang="scss">
@import '@/assets/css/public/layout.scss';
</style>
