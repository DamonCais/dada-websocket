
const request = require('request');

var sk = '97IPfP7BIgxhcljmiL3myY6ZciosCXUa'; // 创建应用的sk
var address = '东莞市东城区东平街1号';

module.exports = function (address) {
    return new Promise((resolve, reject) => {
        let href = getFullUrl('http://api.map.baidu.com/geocoder/v2/', {
            address,
            output: "json",
            ak: sk
        })
        console.log(href);
        request.get(encodeURI(href), function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            if (JSON.parse(body).status === 0) {
                resolve(JSON.parse(body));

            } else {
                reject(JSON.parse(body));
            }
        })
    })
}

function getFullUrl(url, params) {
    let query = ''
    for (const p in params) {
        query += `&${p}=${params[p]}`
    }
    url += '?' + query.substring(1)
    return url
}

//http://api.map.baidu.com/geocoder/v2/?address=北京市海淀区上地十街10号&output=json&ak=alRA0Z1p6KZo3gj9fydc27sOvXk44W9v&callback=showLocation //GET请求