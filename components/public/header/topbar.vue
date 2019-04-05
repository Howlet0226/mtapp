<template>
  <el-row :gutter="0" class="m-topbar">
    <el-col :span="5">
      <geo/>
    </el-col>
    <el-col :span="5">
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


