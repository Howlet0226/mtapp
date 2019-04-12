const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
// 引入mongoose模块
import mongoose from 'mongoose'
// 引入操作post请求信息获取的模块，就可以使用ctx.request.body获得数据
import bodyParser from 'koa-bodyparser'
// 基于koa的session，
import session from 'koa-generic-session'
import Redis from 'koa-redis'
import json from 'koa-json'
import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import users from './interface/users'
import geo from './interface/geo'
import search from './interface/search'

const app = new Koa()

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server


  //  设置秘钥
app.keys = ['zxczxczxcas','asdwerwqrwer']
app.proxy = true
// key为设置存在cookie中的名字，prefix为session值添加一个前缀，store表示连接redis
app.use(session({key: 'mt', prefix: 'mt:uid', store: new Redis()}))
// 设置post数据获取的模块
app.use(bodyParser({
  extendTypes:['json','form','text']
}))
// 设置json字符串美化的模块
app.use(json())
// 让mongoose去连接数据库
mongoose.connect(dbConfig.dbs,{
  useNewUrlParser:true
})
// 设置检验模块初始化
app.use(passport.initialize())
// 此设置就会让ctx里面的session属性有passport属性
app.use(passport.session())

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  // allowedMethods的作用是当次路由所有的中间件执行完成以后，如果ctx.status为空或者为404，就返回一个header头，里面有丰富的response对象。
app.use(users.routes()).use(users.allowedMethods())
app.use(geo.routes()).use(geo.allowedMethods())
app.use(search.routes()).use(search.allowedMethods())
  app.use(ctx => {
    // console.log(ctx.session)
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
