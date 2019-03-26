import axios from 'axios'
import {loginIn} from "../redux/userInfo/action";
import qs from 'qs';

export const getArticles = (url, params,callBack) => {
    axios.get(url,{params:params}).then(function (res) {
        console.log('res', res);
        if (res.status === 200) {
            // if(dispatch){
            //     dispatch(getList({
            //         data: res.data,
            //         state: false
            //     }));
            // }

            if(callBack){
                callBack(res.data);
            }

        } else if (res.status === 404) {
            console.log('not found');
        }
    }, function (error) {

    }).catch(function (error) {
        console.log('error', error);
    });
};

export const saveArticle = (url, params,)=>{
    axios.post(url,qs.stringify(params)).then(function (res) {
        if(res.status === 200){
            if(res.data.isSuccess){
                console.log('插入成功');
            }else{
                console.log('插入失败');
            }

        }
    })
};

export const login = function* (url, param, dispatch)  {

    let result ={};

    yield axios.post(url, qs.stringify(param), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (res) {
        if (res.status === 200) {
            // console.log('res', res);
            if (res.data.isOk) {
                dispatch(loginIn(param));
            } else {
                console.log('账号或密码错误');
            }
            result = res;
        } else {
            console.log('error');
        }
    }).catch(function (e) {
        console.log('未知错误', e);
    });

    yield result;
};

export const getToken = () => {

};

export const getTags = () => {

};


export const getArticleForId = (url,params,callback)=>{
    axios.post(url,qs.stringify(params)).then(function (res) {
        if(res.status === 200){
            if(res.data.isSuccess){
                console.log('查询成功',res.data);
                if(callback){
                    callback(res.data.data)
                }
            }else{
                console.log('插入失败');
            }

        }
    })
};


