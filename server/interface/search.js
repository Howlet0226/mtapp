import Router from "koa-router";
import axios from "./utils/axios";
import Poi from "../dbs/moudles/poi";
import regions from "../dbs/moudles/regions";

let router = new Router({
  prefix: "/search"
});

router.get("/top", async ctx => {
  try {
    let top = await Poi.find({
      // mongoose里面使用正则来进行模糊搜索的形式，切记要打引号
      name: new RegExp(ctx.query.input),
      city: ctx.query.city
    });
    ctx.body = {
      code: 0,
      top: top.map(item => {
        return {
          name: item.name,
          type: item.type
        };
      }),
      type: top.length ? top[0].type : ""
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      top: []
    };
  }
});

router.get("/products", async ctx => {
  let keyword = ctx.query.keyword || "美食";
  let city = ctx.query.city || "三亚";
  let { data:{product,more} } = {
    data: {
      product:[
        {
          photos: [
            {
              url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555492815585&di=c2e6c0ff8a867ec088f984102a8a2cfe&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0150dd57b3dc590000012e7e98af77.jpg%402o.jpg",
              title: "我是图片"
            }
          ],
          name: "什么恋",
          biz_ext: {
            rating: 100,
            cost: 299
          },
          location: "重庆南山",
          address: "cqupt"
        }
      ],
      more: [
        {
          photos: [
            {
              url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555492815584&di=7a9542bf44993afe7c92273f75af41b3&imgtype=0&src=http%3A%2F%2Fimglf1.ph.126.net%2FjFYeWhDGO-OirgdD0hu4Bw%3D%3D%2F1982428261073621848.jpg",
              title: "我是图片"
            }
          ],
          name: "巴适得很",
          deadline: "2002-01-01",
          biz_ext: {
            ticket_ordering: 30,
            cost: 199
          }
        }
      ]
    }
  };
  let { status } = {
    status: 200
  };
  ctx.body = {
    status,
    product,
    more
  };
});

router.get("/hotplace", async ctx => {
  // 表示获取当前城市的信息，如果没有就获取传输过来的城市信息
  // 我们做的是假数据，就不用这样写，直接获取传过来的信息就行
  //  let city = ctx.store ? ctx.store.state.geo.position.city : ctx.query.city

  try {
    let result = await regions.find({
      //  数据在名字城市后面打了一个空格，牛逼
      city: new RegExp(ctx.query.city)
    });
    ctx.body = {
      code: 0,
      result: result.map(item => {
        return {
          name: item.name
        };
      })
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      result: []
    };
  }
});

export default router;
