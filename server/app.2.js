const fs = require('fs');
const path = require('path');


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


let router = new Router();
router.post('/callback', require('./callback')());
router.post('/fee.query', require('./feeQuery')());
router.post('/order.creat', require('./orderCreat')());
// 使用路由
app.use((ctx) => {
    console.log(ctx.request.body);
    newMsg = ctx.request.body
    fs.writeFile(__dirname + '/example.txt', JSON.stringify(newMsg), function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
})




// 这一行代码一定要在最后一个app.use后面使用
var server = require('http').Server(app.callback()),
    io = require('socket.io')(server);


// Socket.io的标准用法
io.on('connection', function (socket) {
    console.log(__dirname);
    // watching the xml file  
    fs.watchFile(__dirname + '/example.txt', function (curr, prev) {
        // 如果xml文件发生了改变，读取xml文件  
        fs.readFile(__dirname + '/example.txt', { encoding: "utf-8" }, function (err, data) {
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
server.listen(4020);
console.info('Now running on localhost:4020');