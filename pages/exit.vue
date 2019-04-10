<template>
  <div class/>
</template>

<script>
export default {
  layout: "blank",
//   根据nuxt生命周期可以知道，middleware是在服务器初始化和点击路由跳转的时候会自动触发
  middleware: async ctx => {
    let { status, data } = await ctx.$axios.get("/users/exit");
    if (status === 200 && data && data.code === 0) {
      window.location.href = "/";
    }
  }
};
</script>
