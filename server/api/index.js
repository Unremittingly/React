const express = require('express');
const app = express();

const article = require('./article');
const login = require('./login');
const bodyParser     =         require("body-parser");

//
// post请求需要加个body  然后通过body获取
app.use(bodyParser.urlencoded({ extended: false }));

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
    article.article(app);
}catch (e) {
    console.log('article list 任务失败',e);
}

try {
    login.loginIn(app);
}catch (e) {
    console.log('login in  任务失败',e);
}


try {
    article.saveArticle(app);
}catch (e) {
    console.log('save Article 失败',e);
}


try {
    article.getArticleForId(app);
}catch (e) {
    console.log('get Article 失败',e);
}



app.listen(3009, () => console.log('Example app listening on port 3009!'));
