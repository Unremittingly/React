import axios from 'axios'
import {loginIn} from "../redux/userInfo/action";
import qs from 'qs';
// import {LOGIN_IN} from "../redux/userInfo/constant";

/********
 * 获取文章列表
 * @param url
 * @param params
 * @param callBack
 */
export const getArticles = (url, params, callBack) => {

    getUrl(url,params).then((result)=>{
        if(callBack){
            callBack(result)
        }
    });
};



/**********
 * 保存文章
 * @param url
 * @param params
 */
export const saveArticle = (url, params,) => {
    axios.post(url, qs.stringify(params)).then(function (res) {
        if (res.status === 200) {
            if (res.data.isSuccess) {
                console.log('插入成功');
            } else {
                console.log('插入失败');
            }

        }
    })
};

/*******
 * 登录验证
 * @param url
 * @param param
 * @param dispatch
 * @returns {Promise<any | never>}
 */

export const login = function (url, param, dispatch) {


    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(param), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (res) {
            if (res.status === 200) {
                // console.log('res', res);
                if (res.data.isOk) {
                    // dispatch({type:LOGIN_IN,info:param});//可以这样写 但是可能感觉 可读性上面没那么好 毕竟才接触  以后再回来看了再说吧   还是先按照下面这种来写吧
                    console.log('请求');
                    dispatch(loginIn(param));
                    resolve(res.data);
                } else {
                    console.log('账号或密码错误');
                    reject();
                }
            } else {
                console.log('error');
            }
        }).catch(function (e) {
            console.log('未知错误', e);
        });
    }).catch((e) => {
        console.log('异常', e);
    });

};


export const getTags = () => {

};

/*******
 * 通过id  获取文章内容
 * @param url
 * @param params
 * @param callback
 * @returns {*}
 */

export const getArticleForId = (url, params, callback) => {

    return postUrl(url,params).then((res)=>{
        if(callback){
            callback(res.data)
        }
    });

};


/********
 * 公共post请求封装
 * @param url
 * @param params
 * @param hint
 * @returns {Promise<any | never>}
 */

export const postUrl = (url, params,hint) => {

    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(params), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (res) {
            if (res.status === 200) {
                if (res.data.isSuccess) {
                    console.log('操作成功');
                    resolve(res.data)
                } else {
                    console.log('操作失败',hint);
                }

            }
        });
    }).catch((e)=>{
        console.log('未知错误',e);
    });

};


/*******
 * 公共get请求封装
 * @param url
 * @param params
 * @returns {Promise<any | never>}
 */

export const getUrl = (url, params)=>{
    return new Promise((resolve, reject) => {
        axios.get(url, {params: params}).then(function (res) {
            console.log('res', res);
            if (res.status === 200) {
                resolve(res.data);
            } else if (res.status === 404) {
                console.log('not found');
                reject();
            }
        });
    }).catch((e)=>{
        console.log('未知错误',e);
    })

};




