
const sqlOptions = require('../FMDB/sqlOperation');
const loginIn = (app)=>{


// 创建 application/x-www-form-urlencoded 编码解析
    app.post('/login',function (req,res,next) {
        let params = req.body;
        let userName = params.userName;
        let password = params.password;
        sqlOptions.selectAll('admin',function (result) {
            let isOk = false;
            if(userName == result[0].username && password==result[0].pwd){
                isOk = true;
            }
            res.send({
                oldInfo:{
                    userName,
                    password
                },
                data:result,
                isOk//是否验证成功
            });

            next();
        });

    })
};

exports.loginIn = loginIn;
