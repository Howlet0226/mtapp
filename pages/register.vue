<template>
  <div class="page-register">
    <div class="header">
      <header>
        <nuxt-link to="/" class="site-logo"></nuxt-link>
        <!-- <a href="/" class="site-logo"/> -->
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button type="primary" size="small">登录</el-button>
          </a>
        </span>
      </header>
    </div>
    <section>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
          <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
          <span class="status">{{statusMsg}}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" maxlength="4"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" maxlength="20" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="ruleForm.cpwd" maxlength="20" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">同意以下协议并注册</el-button>
          <div class="errow">{{err}}</div>
        </el-form-item>
        <el-form-item>
          <a class="f1" href="http://www.meituan.com/about/terms" target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      statusMsg: "",
      err: "",
      ruleForm: {
        name: "",
        code: "",
        pwd: "",
        cpwd: "",
        email: ""
      },
      //   校验规则
      // required表示是否为必选项，type表示类型，message表示不填或者错误提示什么信息，trigger表示如何触发这个校验规则
      rules: {
        name: [
          {
            required: true,
            type: "string",
            message: "请输入昵称",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            type: "email",
            message: "请输入邮箱",
            trigger: "blur"
          }
        ],
        pwd: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        cpwd: [
          {
            required: true,
            message: "确认密码",
            trigger: "blur"
          },
        //   第二个值为一个效验函数,其中参数第一个为规则，第二个为输入的值，第三个为回调函数
        // 详细请查看文档
          {
              validator:(rule,value,callback)=>{
                  if(value === ''){
                      callback(new Error('请再次输入密码'))
                  }else if(value !== this.ruleForm.pwd){
                      callback(new Error('两次密码不一致'))
                  }else {
                      callback()
                  }
              },
              trigger:'blur'
          }
        ]
      }
    };
  },
  layout: "blank",
  methods: {
    sendMsg: function() {},
    register: function() {}
  }
};
</script>
<style lang='scss'>
@import "@/assets/css/register/index.scss";
</style>