const express = require('express');
const app = express();

const Api = require('./article');


//设置跨域请求头  一个中间件设置跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//article list api
try {
    Api.article(app);
}catch (e) {
    console.log('article list 任务失败',e);
}



app.all('*', function (req, res, next) {

});



app.listen(3009, () => console.log('Example app listening on port 3009!'));
