
const socket = (app)=>{
    app.post('/socket',function (req,res,next) {
        console.log('socket 连接');
    })
};


exports.socket = socket;
