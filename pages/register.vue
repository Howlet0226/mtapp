<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a
          href="/"
          class="site-logo" />
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button
              type="primary"
              size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <!--         ref="ruleForm",可以获得这个表单的引用，在函数里面就可以使用$.refs.['ruleForm']来引用表单 -->
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item
          label="昵称"
          prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email">
          <el-input v-model="ruleForm.email" />
          <el-button
            size="mini"
            round
            @click="sendMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item
          label="验证码"
          prop="code">
          <el-input
            v-model="ruleForm.code"
            maxlength="4" />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="pwd">
          <el-input
            v-model="ruleForm.pwd"
            type="password" />
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="cpwd">
          <el-input
            v-model="ruleForm.cpwd"
            type="password" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="register">同意以下协议并注册</el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a
            class="f1"
            href="http://www.meituan.com/about/terms"
            target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
        export default {
          data() {
            return {
              timerid:'',
              statusMsg: '',
              error: '',
              ruleForm: {
                name: '',
                code: '',
                pwd: '',
                cpwd: '',
                email: ''
              },
      //   校验规则，elementui提供的方法
      // required表示是否为必选项，type表示类型，message表示不填或者错误提示什么信息，trigger表示如何触发这个校验规则
              rules: {
                name: [{
                  required: true,
                  type: 'string',
                  message: '请输入昵称',
                  trigger: 'blur'
                }],
                email: [{
                  required: true,
                  type: 'email',
                  message: '请输入邮箱',
                  trigger: 'blur'
                }],
                pwd: [{
                  required: true,
                  message: '创建密码',
                  trigger: 'blur'
                }],
                cpwd: [{
                  required: true,
                  message: '确认密码',
                  trigger: 'blur'
                },
                 {
                  validator: (rule, value, callback) => {
                    if (value === '') {
                      callback(new Error('请再次输入密码'))
                    } else if (value !== this.ruleForm.pwd) {
                      callback(new Error('两次输入密码不一致'))
                    } else {
                      callback()
                    }
                  },
                  trigger: 'blur'
                }
              ]
              }
            }
          },
          // 定义模板
          layout: 'blank',
          methods: {
            // 发送信息：
            sendMsg: function () {
              // 取到data，因为里面会使用到this
              const self = this;
              //
              let namePass
              let emailPass
              //
              if (self.timerid) {
                return false
              }
              // 当表单在前端验证失败的时候，vaild里面就会有值，这是element封装好的方法
              this.$refs['ruleForm'].validateField('name', (valid) => {
                namePass = valid
              })
              // 将状态信息做一个初始化:
              self.statusMsg = ''
              // 有值说明失败,
              if (namePass) {
                return false
              }
              // name成功,验证email,
              this.$refs['ruleForm'].validateField('email', (valid) => {
                emailPass = valid
              })
              // 如果两个都成功了，说明是合法的方式，可以发送给后台
              if (!namePass && !emailPass) {
                // 这里没有引用axios模块,为什么可以使用?因为nuxt框架帮我们在配置文件里面 modules选项里配置了
                self.$axios.post('/users/verify', {
                  // 将传过来的名字进行编码，防止有符号之类的东西出现
                  username: encodeURIComponent(self.ruleForm.name),
                  email: self.ruleForm.email
                  // 穿过去以后便会像邮件发送文件
                }).then(({
                  // 完成以后，会得到一个状态码和一个数据
                  status,
                  data
                }) => {
                  // 如果成功并且有数据且数据的code值为0，说明发送成功
                  if (status === 200 && data && data.code === 0) {
                    let count = 60;
                    self.statusMsg = `验证码已发送,剩余${count--}秒`
                    self.timerid = setInterval(function () {
                      self.statusMsg = `验证码已发送,剩余${count--}秒`
                      if (count === 0) {
                        clearInterval(self.timerid)
                      }
                    }, 1000)
                  } else {
                    // 如果发送失败，则返回失败的信息
                    self.statusMsg = data.msg
                  }
                })
              }
            },
            register: function () {
              let self = this;
              // 验证表单中所填值是否符合elementUI设定的规则 ？？？
              this.$refs['ruleForm'].validate((valid) => {
                // console.log(valid)
                if (valid) {
                  self.$axios.post('/users/signup', {
                    username: encodeURIComponent(self.ruleForm.name),
                    password: CryptoJS.MD5(self.ruleForm.pwd).toString(),
                    email: self.ruleForm.email,
                    code: self.ruleForm.code
                  }).then(({
                    status,
                    data
                  }) => {
                    if (status === 200) {
                      if (data && data.code === 0) {
                        alert('注册成功')
                        location.href = '/login'
                      } else {
                        self.error = data.msg
                      }
                    } else {
                      self.error = `服务器出错，错误码:${status}`
                    }
                    setTimeout(function () {
                      self.error = ''
                    }, 1500)
                  })
                }
              })
            }
          }
        }
</script>

<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>
