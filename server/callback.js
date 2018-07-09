

const fs = require('fs');
const path = require('path');


module.exports = function () {
  return async function (ctx) {
    console.log('callback')
    fs.writeFile(__dirname + '/status.txt', JSON.stringify(ctx.request.body), function (err) {
      if (err) throw err;
      console.log('It\'s saved!');
    });
    ctx.body = ctx.request.body;

  }
}
