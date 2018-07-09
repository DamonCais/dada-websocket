var dada = require('./dadaService')

var dadaApi = new dada();

var getLocal = require('./local');

var order = {
  'shop_no': '11047059',
  'origin_id': Math.round(new Date().getTime() / 1000).toString(),
  'city_code': '0769',
  'cargo_price': 10,
  'is_prepay': 0,
  'receiver_name': '蔡锦源',
  'receiver_address': '东莞市东城区创客谷516',
  'receiver_phone': '13728119700',
  'is_use_insurance': 0,
  'callback': 'http://damon.s1.natapp.cc'
}

module.exports = function () {
  return async function (ctx) {
    try {
      let order = ctx.request.body;
      order.is_prepay = order.is_prepay ? 1 : 0;
      order.is_use_insurance = order.is_use_insurance ? 1 : 0;
      let add = await getLocal(order.receiver_address);
      order.callback = 'http://damon.s1.natapp.cc/callback'

      let { lat, lng } = add.result.location;
      order.receiver_lat = lat;
      order.receiver_lng = lng;
      let res = await dadaApi.sendPost('addOrder', order);
      console.log(res);
      ctx.body = res;
    } catch (error) {
      console.log(error);
      ctx.throw(404);
    }

  }
}

