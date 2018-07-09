



var dada = require('./dadaService')

var dadaApi = new dada();

module.exports = function () {
  return async function (ctx) {

    console.log(ctx.request.body);
    let obj = ctx.request.body;
    let res = await dadaApi.sendPost(obj.status, { order_id: obj.order_id })
    ctx.body = res;

  }
}
