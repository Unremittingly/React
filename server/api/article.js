const sqlOptions = require('../FMDB/sqlOperation');

const article = (app) => {
    app.get('/article', function (req, res, next) {
        //加载页面
        //todo 数据库操作获取数据

        let sql = 'SELECT * from article';
        let r = res;
        console.log('req', req.query);
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
        let value = '("' + title + '","' + type + '","' + time + '","' + content + '","' + desc + '")';
        let sql = 'INSERT INTO article(title,type,time,content,description) VALUES' + value;
        sqlOptions.insertData(sql, function (isSuccess) {
            console.log('isSuccess', isSuccess);
            res.send({
                isSuccess
            });
            next();
        });

    })
};

exports.editArticle = editArticle;
exports.article = article;
exports.saveArticle = saveArticle;
