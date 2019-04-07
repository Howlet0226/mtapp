<template>
  <div class="m-header">
      <topbar/>
      <searchbar/>
  </div>
</template>

<script>
import topbar from './topbar.vue'
import searchbar from './searchbar.vue'
export default {
    components:{
        topbar,
        searchbar
    }
}

</script>
<style lang="scss">
  @import "@/assets/css/public/header/index.scss"
  
</style>