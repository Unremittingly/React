const sqlOptions = require('../FMDB/sqlOperation');
const formidable = require('formidable');
const fs = require('fs');

const article = (app) => {
    app.get('/article', function (req, res, next) {
        //加载页面
        //todo 数据库操作获取数据

        let sql = 'SELECT * from article';
        let r = res;
        sqlOptions.operationData(sql, function (result) {
            // console.log('res',res);
            r.send(
                {
                    test: 'test测试',
                    data: result,
                    isOk: true
                });
            next();
        });


    })
};

const editArticle = (app) => {
    app.get('/edit', function (req, res, next) {
        sqlOptions.update('', function () {

        })
    })
};

const saveArticle = (app) => {
    app.post('/saveArticle', function (req, res, next) {
        // console.log('req.body', req.body);
        let title = req.body.title;
        let content = req.body.content;
        let time = req.body.time;
        let type = req.body.type;
        let desc = req.body.desc;
        let tabType = req.body.tabType;
        console.log('content', content);
        console.log('desc', desc);

        let value = '("' + title + '","' + type + '","' + time + '","' + content + '","' + desc + '","' + tabType + '")';
        let sql = 'INSERT INTO article(title,type,time,content,description,tabtype) VALUES' + value;
        sqlOptions.insertData(sql, function (isSuccess) {
            console.log('isSuccess', isSuccess);
            res.send({
                isOk: isSuccess
            });
            next();
        });


    })
};

const getArticleForId = (app) => {
    app.post('/getArticle', function (req, res, next) {
        // console.log('req.body', req.body);
        let clientIp = getIp(req);
        console.log('客户端ip', clientIp);
        let id = req.body.id;

        updateVisits(clientIp, id, () => {

        });
        let sql = 'SELECT' +
            ' a.*,' +
            ' COUNT( DISTINCT b.id) as count' +
            ' FROM' +
            ' article a' +
            ' LEFT JOIN visit b ON b.articleId = a.id' +
            ' WHERE a.id=' + id +
            ' GROUP BY a.id ';
        sqlOptions.operationData(sql, function (data) {
            res.send({
                isOk: true,
                data: data[0]
            });
            next();
        })


    });


};
let getIp = function (req) {
    let ip = req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress || '';
    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0];
    }
    return ip;
};

const uploadImg = (app) => {
    app.post('/uploadImg', function (req, res, next) {
        let form = new formidable.IncomingForm();
        let dir = "./public/image/";
        form.uploadDir = dir;
        form.parse(req, function (err, fields, files) {
            let oldPath = files.fileName.path; //fileName就是我们刚在前台模板里面配置的后台接受的名称；
            let curTime = parseInt(new Date().getTime() / 1000);
            let extname = curTime + '_' + files.fileName.name; //获取图片名称
            //新的路径由组成：原父路径 + 拓展名

            let newPath = dir + extname;
            //改名     把之前存的图片换成真的图片的完整路径
            fs.rename(oldPath, newPath, function (err) {
                if (err) {
                    res.send({isOk: false, err});
                }
                let resPath = newPath.replace("./public", "http://localhost:3009"); //处理图片路径  让前端能访问
                res.send({isOk: true, url: [resPath]}) //返回图片路径
            });
        });
    })

};

const getRecent = (app) => {
    app.post('/getRecent', function (req, res, next) {
        // 近三天的文章
        let time = new Date().getTime() / 1000 - 60 * 60 * 24 * 3;

        let sql = 'SELECT * from article where time >' + time;
        sqlOptions.operationData(sql, function (result) {
            res.send({
                isOk: true,
                data: result
            });
            next();
        })

    })
};


const updateVisits = (visitIp, articleId, callback) => {

    //判断     如果是相同ip就不插入啦
    let time = new Date().getTime() / 1000;
    let value = '("' + visitIp + '"," ' + time + '"," ' + articleId + '")';
    let sql = 'INSERT INTO visit(visitIp,visitTime,articleId) VALUES ' + value;
    sqlOptions.operationData(sql, function (data) {
        callback();
        console.log('data', data);
    })


};


const search = (app) => {
    app.post('/search', function (req, res, next) {
        //加载页面

        let time = req.body.time;
        let type = req.body.type;
        let str = req.body.str;

        let sql = 'SELECT * from article';

        let arr = [{
            field: 'time',
            sql: '>',
            value: time ? time : 0
        }, {
            field: 'type',
            sql: '=',
            value: type
        }, {
            fieldT: 'title',
            field: 'description',
            sql: '  LIKE',
            value: str ? " '%" + str + "%'" : ''
        }];
        //拼接搜索的sql
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].value) {

                if (sql.indexOf('WHERE') === -1) {
                    if (arr[i].field === 'description') {
                        sql += " WHERE (" + arr[i].field + arr[i].sql + arr[i].value + " or " +
                            arr[i].fieldT + arr[i].sql + arr[i].value + ")";
                    } else {
                        sql += " WHERE " + arr[i].field + arr[i].sql + arr[i].value;
                    }

                } else {
                    if (arr[i].field === 'description') {
                        sql += " and (" + arr[i].field + arr[i].sql + arr[i].value + " or " +
                            arr[i].fieldT + arr[i].sql + arr[i].value + ")";
                    } else {
                        sql += " and " + arr[i].field + arr[i].sql + arr[i].value;
                    }

                }
            }
        }
        // console.log('sql', sql);

        let r = res;
        sqlOptions.operationData(sql, function (result) {
            // console.log('res',res);
            r.send(
                {
                    test: 'test测试',
                    data: result,
                    isOk: true
                });
            next();
        });


    })
};

const deleteArticle = (app) => {
    app.post('/deleteArticle', function (req, res, next) {
        let id = req.body.id;
        let sql = 'DELETE from article WHERE id=' + id;
        let r = res;
        sqlOptions.operationData(sql, function (result) {
            // console.log('res',res);
            r.send(
                {
                    test: 'test测试',
                    data: result,
                    isOk: true
                });
            next();
        });
    })
};

const getCurTime = () => {

    return parseInt(new Date() / 1000);
};
const addComment = (app) => {
    app.post('/addComment', function (req, res, next) {
        let article_id = req.body.articleId;
        let comment_id = req.body.commentId;
        let time = getCurTime();
        let content = req.body.content;
        let sql = 'INSERT INTO comment(article_id,comment_id,time,content) VALUES ' + '("' + article_id + '","' + comment_id + '","' + time + '","' + content + '")';
        let isSuccess = sqlOptions.operationData(sql, function (data) {
            if (data.insertId) {
                res.send({
                    data: data,
                    isOk: true
                });
            }

        })
    })
};

const getPageNav = (app) => {
    app.post('/getPageNav', function (req, res, next) {
        let article_id = req.body.articleId;
        let sql = 'SELECT * FROM article  where id<' + article_id + '  ORDER BY id DESC  limit 1';
        let nSql = 'SELECT * FROM article  where id>' + article_id + '  limit 1';
        sqlOptions.operationData(sql, function (pData) {
            sqlOptions.operationData(nSql,function (nData) {
                res.send({
                    pData:pData,
                    nData:nData,
                    isOk: true
                })
            });

        })
    })
};


exports.getPageNav = getPageNav;
exports.addComment = addComment;
exports.deleteArticle = deleteArticle;
exports.search = search;
exports.getRecent = getRecent;
exports.editArticle = editArticle;
exports.article = article;
exports.saveArticle = saveArticle;
exports.getArticleForId = getArticleForId;
exports.uploadImg = uploadImg;
