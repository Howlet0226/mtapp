<template>
<div class="page-index">
  <el-row>
    <el-col :span="5">
      <mymenu/>
    </el-col>
    <el-col :span="19">
      <life/>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="24">3</el-col>
  </el-row>
</div>
</template>

<script>
  import mymenu from '~/components/index/menu.vue' 
  import Life from '@/components/index/life.vue'


export default {
  components: {
    mymenu,
    Life
  }
}
</script>

<style>

</style>
