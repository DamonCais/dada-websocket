const axios = require('axios');

var devPrefix = "http://newopen.qa.imdada.cn";
var proPrefix = "http://newopen.imdada.cn";

var prefix = devPrefix;

const md5 = require("md5");
var api = {
    addOrder: '/api/order/addOrder', //新增订单
    reAddOrder: '/api/order/reAddOrder', //重新增加订单
    queryDeliverFee: '/api/order/queryDeliverFee', //运费接口
    addAfterQuery: '/api/order/addAfterQuery', //查询运费后发单接口
    addTip: '/api/order/addTip', //添加小费
    query: '/api/order/status/query', //订单回调
    formalCancel: '/api/order/formalCancel', //取消订单
    reasons: '/api/order/cancel/reasons', //订单取消原因
    exist: '/api/order/appoint/exist', //追加订单
    cancel: '/api/order/appoint/cancel', //取消追加订单
    transporter: '/api/order/appoint/list/transporter', //查询配送员
    cityCode: '/api/cityCode/list', //获取城市信息列表
    addShop: '/api/shop/add', //添加门店
    updateShop: '/api/shop/update', //更新门店
    detailShop: '/api/shop/detail', //门店信息
    addMerchant: '/merchantApi/merchant/add', //新增商户
    orderAccept: '/api/order/accept', //模拟接受订单
    orderFetch: '/api/order/fetch',//模拟完成取货
    orderFinish: '/api/order/finish',//模拟完成订单
    orderCancel: '/api/order/cancel',//模拟取消订单
    orderExpire: '/api/order/expire',//模拟订单过期
};



function DadaService() {
    this.opts = {
        app_key: 'dadac418ab9a2e933e4',
        timestamp: Math.round(new Date().getTime() / 1000).toString(),
        format: "json",
        v: "1.0",
        source_id: "73753",
    }
    this.app_key = "dadac418ab9a2e933e4";
    this.app_secret = "592c040613c267b5c2b48552e1cdd313";
    this.sign = this.getSign();
}


/**
 * 生成签名
 * 签名生成的通用步骤如下：
 * 第一步：将参与签名的参数按照键值(key)进行排序。
 * 第二步：将排序过后的参数进行key value字符串拼接。
 * 第三步：将拼接后的字符串首尾加上app_secret秘钥，合成签名字符串。
 * 第四步：对签名字符串进行MD5加密，生成32位的字符串。
 * 第五步：将签名生成的32位字符串转换为大写。
 * @return
 */
DadaService.prototype.getSign = function () {
    var list = Object.keys(this.opts).sort();
    var signStr = "";
    for (var l in list) {
        signStr += list[l] + this.opts[list[l]];
    }
    var str = md5(this.app_secret + signStr + this.app_secret);
    return str.toUpperCase();
}

/**
 * 发送请求
 * @param {String} req
 * @param {String} param JSON格式的数据
 */

//请求和响应的数据都为JSON格式。注：请设置Header的Content-Type为application/json
DadaService.prototype.sendPost = function (req, param) {
    this.opts.body = JSON.stringify(param);
    const sign = this.getSign();
    const url = prefix + api[req];
    // const url = proPrefix + api[req];
    options = {
        body: this.opts.body,
        format: this.opts.format,
        timestamp: this.opts.timestamp,
        signature: sign,
        app_key: this.opts.app_key,
        v: this.opts.v,
        source_id: this.opts.source_id,
    }
    return new Promise((resolve, reject) => {

        axios({
            url,
            method: 'post',
            data: options,
            headers: { 'Accept': 'application/json' },

        }).then(res => {
            resolve(res.data);
        })
    })
}

module.exports = DadaService;