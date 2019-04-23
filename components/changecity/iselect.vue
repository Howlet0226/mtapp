<template>
  <div class="m-iselect">
    <span class="name">按省份选择：</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option v-for="item in province" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-select v-model="cvalue" :disabled="!city.length" placeholder="城市">
      <el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
  // 同样也需要防抖
import _ from 'lodash'
import { async } from 'q';

export default {
  data: () => {
    return {
      province: [],
      city: [],
      cvalue: "",
      pvalue: ""
    };
  },
  // 监控省份的值，以此来控制城市的值
  watch: {
    pvalue: async function(newPvalue) {
      let self = this;
      let {
        status: status2,
        data:{cities}
      } = await self.$axios.get("/geo/cities", {
        params: {
          id:newPvalue
        }
      });
      // console.log(data)
      if (status2 == 200) {
        self.city = cities.map(item => {
          return {
            value: item.id,
            label: item.name
          };
        });
      }

      // 每次改变省份的值得时候，要把城市的现有值做一个初始化。
      self.cvalue = "";
    }
  },
  methods: {
  },
  mounted: async function() {
    let self = this;
    let {
      status,
      data: { province }
    } = await self.$axios.get("/geo/province");
    if (status === 200) {
      self.province = province.map(item => {
        return {
          value: item.id,
          label: item.name
        };
      });
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/changeCity/iselect.scss";
</style>