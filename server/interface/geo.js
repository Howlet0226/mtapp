import Router from 'koa-router'
import axios from './utils/axios'
import Province from '../dbs/moudles/province'
import Menu from '../dbs/moudles/menu'
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
  // 在使用前记得先导入数据
  let province  = await Province.find()
  console.log(province);
  ctx.body = {
    province:province.map(item=>{
      return {
        id: item.id,
        name:item.value
      }
    })
  }
})


router.get('/menu',async ctx =>{
  let result = await Menu.find()
  // console.log(result);
  ctx.body = {
    menu:result[0].menu
  }
})

export default router;
