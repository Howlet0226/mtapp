<template>
  <div class="m-geo">
    <i class="el-icon-location"/>{{ $store.state.geo.position.city }}
    <nuxt-link class="changeCity" to="/changecity">切换城市</nuxt-link>[香河 天津 重庆]
  </div>
</template>
