const fs = require('fs');
const path = require('path');


const redis = require('redis')

const client = redis.createClient(6379, 'localhost')

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
var static = require('koa-static');
var cors = require('koa-cors');

const Router = require('koa-router')

const app = new Koa()
// 使用./public下的静态文件

app.use(cors());
app.use(bodyParser());

const staticPath = '../dist'
app.use(static(
    path.join(__dirname, staticPath)
))
app.use(async (ctx, next) => {
    console.log(ctx.request.body);
    await next();
})


let router = new Router();
router.post('/callback', require('./callback')());
router.post('/feeQuery', require('./feeQuery')());
router.post('/fake', require('./fake')());
router.post('/orderCreate', require('./orderCreate')());
// 使用路由


app.use(router.routes());

// 这一行代码一定要在最后一个app.use后面使用
var server = require('http').Server(app.callback()),
    io = require('socket.io')(server);
// Socket.io的标准用法
var currentMsg;
io.on('connection', (socket) => {
    fs.watchFile(__dirname + '/status.txt', function (curr, prev) {
        // 如果xml文件发生了改变，读取xml文件  
        fs.readFile(__dirname + '/status.txt', { encoding: "utf-8" }, function (err, data) {
            if (err) throw err;
            // xml转换为json  
            console.log(data);
            var json = JSON.parse(data);
            // 发送新的数据到客户端  
            socket.volatile.emit('notification', json);
        });
    });
});

// 开启服务器
server.listen(8000);
console.info('Now running on localhost:8000');