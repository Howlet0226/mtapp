<template>
<el-container class="layout-default">
  <el-header style="height:197px"><my-header/></el-header>
  <el-main><nuxt/></el-main>
  <el-footer>Footer</el-footer>
</el-container>

</template>

  <script>
  import myHeader from '@/components/public/header/index.vue';
  export default {
    components:{
      myHeader
    }
  }
  </script>
<style lang="scss">
@import '@/assets/css/public/layout.scss';
</style>
