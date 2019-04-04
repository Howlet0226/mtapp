<template>
  <div class="m-nav">
    <ul class="nav">
      <li class="list">
        <nuxt-link to="/my">我的美团</nuxt-link>
        <dl>
          <dd>
            <nuxt-link to="/order">我的订单</nuxt-link>
          </dd>
          <dd>
            <nuxt-link to="/order">我的收藏</nuxt-link>
          </dd>
          <dd>
            <nuxt-link to="/order">抵用券</nuxt-link>
          </dd>
          <dd>
            <nuxt-link to="/order">账户设置</nuxt-link>
          </dd>
        </dl>
      </li>
      <li>
        <nuxt-link to="/order">手机APP</nuxt-link>
      </li>
      <li class="list bd">
        <nuxt-link to="/center">商家中心</nuxt-link>
        <dl>
            <dd><nuxt-link to="/user">登录商家中心</nuxt-link></dd>
            <dd><nuxt-link to="/user">我想合作</nuxt-link></dd>
            <dd><nuxt-link to="/user">免费手机开店</nuxt-link></dd>
            <dd><nuxt-link to="/user">商家申请开票</nuxt-link></dd>
        </dl>
      </li>
      <li class="list site">
        <nuxt-link to="/site">网站导航</nuxt-link>
        <div class="subContainer">
            <dl class="hotel">
                <dd>1</dd>
            </dl>
            <dl class="food">
                <dd>2</dd>
            </dl>
            <dl class="moive">
                <dd>3</dd>
            </dl>
            <dl class="app">
                <dd>4</dd>
            </dl>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
</style>