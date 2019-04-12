import Router from 'koa-router'
import axios from './utils/axios'
import Poi from '../dbs/moudles/poi'
import regions from '../dbs/moudles/regions'

let router =  new Router({
  prefix : '/search'
})

router.get('/top' , async ctx =>{
  try{
    let top = await Poi.find({
      // mongoose里面使用正则来进行模糊搜索的形式，切记要打引号
      'name':  new RegExp(ctx.query.input),
       city:ctx.query.city
    })
    ctx.body = {
      code : 0,
      top : top.map(item=>{
        return{
          name:item.name,
          type:item.type
        }
      }),
      type: top.length ? top[0].type : ''
    }
  } catch(e){
    ctx.body = {
      code:-1,
      top:[]
    }
  }
})


router.get('/hotplace', async ctx=>{
  // 表示获取当前城市的信息，如果没有就获取传输过来的城市信息
  // 我们做的是假数据，就不用这样写，直接获取传过来的信息就行
  //  let city = ctx.store ? ctx.store.state.geo.position.city : ctx.query.city

   try{
     let result = await regions.find({
      //  数据在名字城市后面打了一个空格，牛逼
       'city':new RegExp(ctx.query.city)
     })
     ctx.body = {
       code : 0,
       result:result.map(item=>{
         return{
           name:item.name
         }
       })
     }

   }catch(e){
     ctx.body={
      code:-1,
      result:[]
     }

   }
})

export default router
