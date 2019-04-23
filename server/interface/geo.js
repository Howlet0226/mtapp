import Router from 'koa-router'
import axios from './utils/axios'
import Province from '../dbs/moudles/province'
import Menu from '../dbs/moudles/menu'
import cities from '../dbs/moudles/cities'
let router = new Router({prefix: '/geo'})


router.get('/getPosition', async ctx=>{
    // 由于没有返回所在位置的接口，就自己写一个假数据上去。
    let{status,data:{province,city}} = {
        status:200,
        data:{
            province:'三亚市',
            city:'三亚市'
        }
    }
    if(status === 200){
        ctx.body = {
            province,
            city
        }
    }else{
        ctx.body={
            province:'',
            city:''
        }
    }
} )


router.get('/province', async ctx =>{
  let province
  if(ctx.query.pvalue){
  // 在使用前记得先导入数据
   province  = await Province.find({
    'value':new RegExp(ctx.query.pvalue)
  })
  }
  else{
     province  = await Province.find()
  }
  ctx.body = {
    province:province.map(item=>{
      return {
        id: item.id,
        name:item.value
      }
    })
  }
})


router.get('/cities', async ctx =>{
  let result
  if(ctx.query.id){
     result = await cities.find({
      id : ctx.query.id
    })
    ctx.body={
      cities:result[0].value.map(item=>{
        return{
          name:item.name,
          id:item.id
        }
      })
    }
  }else{
    result = await cities.find()
    ctx.body={
      cities:result.map(item=>{
        return item.value.map(item=>{
          return item.name
        })
      })
    }
  }


})


router.get('/menu',async ctx =>{
  let result = await Menu.find()
  ctx.body = {
    menu:result[0].menu
  }
})

export default router;
