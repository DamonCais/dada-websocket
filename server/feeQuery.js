const redis = require('redis')

const client = redis.createClient(6379, 'localhost')


var dada = require('./dadaService')

var dadaApi = new dada();
// var order = {
//   'shop_no': '11047059',
//   'origin_id': Math.round(new Date().getTime() / 1000).toString(),
//   'city_code': '0769',
//   'cargo_price': 10,
//   'is_prepay': 0,
//   'receiver_name': '蔡锦源',
//   'receiver_address': '东莞市东城区创客谷516',
//   'receiver_phone': '13728119700',
//   'is_use_insurance': 0,
//   'callback': 'http://damon.s1.natapp.cc'
// }




module.exports = function () {
  return async function (ctx) {
    let order = ctx.request.body;
    order.is_prepay = order.is_prepay ? 1 : 0;
    order.is_use_insurance = order.is_use_insurance ? 1 : 0;
    order.callback = 'http://damon.s1.natapp.cc/callback'
    let res = await dadaApi.sendPost('queryDeliverFee', order);
    console.log(res);
    ctx.body = res;

  }
}
