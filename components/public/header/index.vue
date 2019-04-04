<template>
  <el-row :gutter="0" class="m-header">
    <el-col :span="4">
      <geo/>
    </el-col>
    <el-col :span="6">
      <user/>
    </el-col>
    <el-col :span="14">
     <mynav/>
    </el-col>
  </el-row>
</template>

<script>
import geo from './geo.vue'
import user from './user.vue'
import mynav from './nav.vue'
export default {
  components: {
    geo,
    user,
    mynav
  }
}
</script>
<style lang="scss">
  @import "@/assets/css/public/header/index.scss";
</style>

