<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24" style="margin-bottom:30px">
        <iselect/>
      </el-col>
      <el-col :span="24">
        <categroy/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import iselect from '@/components/changecity/iselect.vue'
import categroy from '@/components/changecity/categroy.vue'

export default {
    components:{
        iselect,
        categroy
    }
};
</script>
<style scoped>
</style>