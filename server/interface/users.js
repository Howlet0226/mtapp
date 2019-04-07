// koa自己没有带路由的，所以我们需要koa-router这个模块
import Router from "koa-router";
// 用于redis的模块
import Redis from "koa-redis";
// 用于发送邮箱的模块
import nodeMailer from "nodemailer";
// 数据库的user表
import User from "../dbs/moudles/user";
// passport工具
import Passport from "./utils/passport";
// axios通信工具
import axios from "./utils/axios";
// 数据库的配置文件
import email from "../dbs/config";
import passport from "./utils/passport";

let router = new Router({
  prefix: "/users"
});

let store = new Redis().client;

router.post("/signup", async ctx => {
  const { username, password, email, code } = ctx.request.body;
  if (code) {
    const saveCode = await store.hget(`nodemail:${username}`, "code");
    const saveExpire = await store.hget(`nodemail:${username}`, "expire");
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: "验证码已过期，请重新尝试"
        };
        return false;
      }
    } else {
      ctx.body = {
        code: -1,
        msg: "请填写正确的验证码"
      };
    }
  } else {
    ctx.body = {
      code: -1,
      msg: "请填写验证码"
    };
  }

  let user = await User.find({
    username
  });
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: "已被注册"
    };
    return;
  }

  let nuser = await User.create({ username, password, email });

  if (nuser) {
    let res = await axios.post("/user/signin", { username, password });
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: "注册成功",
        user: res.data.user
      };
    } else {
      ctx.body = {
        code: -1,
        msg: "出现错误，请重新注册"
      };
    }
  } else {
    ctx.body = {
      code: -1,
      msg: "注册失败"
    };
  }
});

router.post("/signin", async (ctx, next) => {
  return passport.authenticate("local", function(err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      };
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: "登录成功",
          user: user
        };
    return ctx.login(user)
      }else {
        ctx.body = {
            code: 1,
            msg: info

          }  
      }
    }
  })(ctx,next)
})

router.post('/verify', async ctx =>{
    let username = ctx.body.request.username
    const saveExpire = await store.hget(`nodemail:${username}`,'expire')
    if(saveExpire && new Date().getTime() - saveExpire <0){
        ctx.body={
            code:-1,
            msg:'验证请求过于频繁，一分钟内一次'
        }
        return false
    }

    let transporter = nodeMailer.createTransport({
        service:'qq',
        auth:{
            user: email.smtp.user,
            pass:email.smtp.pass
        }
    })


    let ko = {
        code:email.smtp.code(),
        expire:email.smtp.expire(),
        email:ctx.request.body.email,
        user: ctx.request.body.username
    }

    let mailOptions = {
        from:`认证邮件<${email.smtp.user}>`,
        to:ko.email,
        subject:'howlet美团网注册码',
        html:`您在howlet美团网注册码中注册，您的邀请码是${ko.code}`
    }
    await transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            return console.log(err);
            
        }else{
            store.hmset(`nodemail:${ko.user}`,'code',ko.code,'expire',ko.expire,'email',ko.email)
        }
    })
    ctx.body={
        code:0,
        msg:'验证码已发送'
    }
})


router.get('/exit', async ctx =>{
    await ctx.logout()
    if(!ctx.isAuthenticated()){
        ctx.body={
            code:0
        }
    }else{
        ctx.body={
            code:-1
        }
    }
})

router.get('/getUser', async ctx =>{
    if(ctx.isAuthenticated()){
        const {username,email} = ctx.session.passport.user
        ctx.body={
            user:username,
            email
        }
    }else{
        ctx.body={
            user:'',
            email:''
        }
    }
})

export default router