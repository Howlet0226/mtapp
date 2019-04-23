import Router from 'koa-router';
import axios from './utils/axios'
import categroy from '../dbs/moudles/categroy'
let router = new Router({prefix: '/categroy'})



router.get('/crumbs',async (ctx)=>{



  let result = await categroy.find()
  if (result) {
    ctx.body = {
      // result
      types: result.map(item =>{
        return item.types
      }),
      areas:result.map(item =>{
        return item.areas
      })
    }
  } else {
    ctx.body = {
      areas: [],
      types: []
    }
  }

})


export default router;
