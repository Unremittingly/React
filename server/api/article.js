const sqlOptions = require('../FMDB/sqlOperation');

const article  =  (app)=>  {
    app.get('/article', function (req, res, next) {
        //加载页面
        //todo 数据库操作获取数据

        let sql = 'SELECT * from info';
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

const editArticle = (app)=>{
    app.get('/edit',function (req,res,next) {
        sqlOptions.update('',function () {

        })
    })
};

exports.editArticle = editArticle;
exports.article = article;
