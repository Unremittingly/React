const express = require('express');
const app = express();

const article = require('./api/article');
const login = require('./api/login');
const socket = require('./api/websocket');
const bodyParser = require("body-parser");
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
//
// post请求需要加个body  然后通过body获取
app.use(bodyParser.urlencoded({extended: false}));
// app.use(require('koa-static')('./image'));
//设置跨域请求头  一个中间件设置跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "userInfo/json;charset=utf-8");
    next();
});


//article list api
try {
    article.article(app);
} catch (e) {
    console.log('article list 任务失败', e);
}

try {
    login.loginIn(app);
} catch (e) {
    console.log('login in  任务失败', e);
}


try {
    article.saveArticle(app);
} catch (e) {
    console.log('save Article 失败', e);
}


try {
    article.getArticleForId(app);
} catch (e) {
    console.log('get Article 失败', e);
}

try {
    article.uploadImg(app);
} catch (e) {
    console.log('图片上传任务 失败', e);
}

try {
    article.getRecent(app)
} catch (e) {
    console.log('获取近期文章任务启动  失败', e);
}

try {
    article.search(app);
} catch (e) {
    console.log('搜索任务启动  fail', e);

}


try {
    article.deleteArticle(app);
} catch (e) {
    console.log('搜索任务启动  fail', e);

}

try {
    article.addComment(app);
} catch (e) {
    console.log('添加评论  fail', e);

}

try {
    article.getCommentForId(app);
} catch (e) {
    console.log('添加评论  fail', e);

}


// try {
//     socket.socket(app)
// }catch (e) {
//     console.log('socket 服务器开启失败',e);
// }

try {
    article.getPageNav(app);
}catch (e) {

}

app.listen(3009, () => console.log('Example app listening on port 3009!'));
