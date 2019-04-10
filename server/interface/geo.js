import Router from 'koa-router'
import axios from 'utils/axios'
import Province from '../dbs/moudles/province'

router.get('/getPosition', async ctx=>{
    // 由于没有返回所在位置的接口，就自己写一个假数据上去。
    let{status,data:{province,city}} = {
        status:200,
        data:{
            province:'重庆市',
            city:'重庆市'
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