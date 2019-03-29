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
                    isSuccess: true
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
        let value = '("' + title + '","' + type + '","' + time + '","' + content + '","' + desc + '","'+tabType+'")';
        let sql = 'INSERT INTO article(title,type,time,content,description,tabtype) VALUES' + value;
        sqlOptions.insertData(sql, function (isSuccess) {
            console.log('isSuccess', isSuccess);
            res.send({
                isSuccess
            });
            next();
        });

    })
};

const getArticleForId = (app) => {
    app.post('/getArticle', function (req, res, next) {
        // console.log('req.body', req.body);
        let id = req.body.id;
        sqlOptions.selectForId(id, 'article', function (data) {
            res.send({
                isSuccess: true,
                data: data
            });
            next();
        })

    })
};

const uploadImg = (app) => {
    app.post('/uploadImg', function (req, res, next) {
        let form = new formidable.IncomingForm();
        let dir = "./public/image/";
        form.uploadDir =dir;
        form.parse(req, function(err, fields, files) {
            let oldPath = files.fileName.path; //fileName就是我们刚在前台模板里面配置的后台接受的名称；
            let extname = files.fileName.name; //获取图片名称
            //新的路径由组成：原父路径 + 拓展名
            let newPath = dir + extname;
            //改名     把之前存的图片换成真的图片的完整路径
            fs.rename(oldPath, newPath, function(err) {
                if(err) {
                    res.send({isOk:false,err});
                }
                let resPath = newPath.replace("./public","http://localhost:3009"); //处理图片路径  让前端能访问
                res.send({isOk:true,url:[resPath]}) //返回图片路径
            });
        });
    })

};

exports.editArticle = editArticle;
exports.article = article;
exports.saveArticle = saveArticle;
exports.getArticleForId = getArticleForId;
exports.uploadImg = uploadImg;
