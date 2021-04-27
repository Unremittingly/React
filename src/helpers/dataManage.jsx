import axios from 'axios'
import {loginIn} from "../redux/userInfo/action";
import qs from 'qs';
// import {LOGIN_IN} from "../redux/userInfo/constant";


const LOCAL_URL ='http://localhost:3009';
// let BASE_URL = 'http://47.240.15.130:3009';
let BASE_URL = LOCAL_URL;

/********
 * 获取文章列表
 * @param url
 * @param params
 * @param callBack
 */
export const getArticles = (url, params, callBack) => {
    getUrl(url, params).then((result) => {
        if (callBack) {
            callBack(result)
        }
    });
};


/**********
 * 保存文章
 * @param url
 * @param params
 */
export const saveArticle = (url, params, callback) => {
    url = dealUrl(url);
    axios.post(url, qs.stringify(params)).then(function (res) {
        if (res.status === 200) {
            if (res.data.isOk) {
                console.log('保存成功');
                if (callback && typeof callback === "function") {
                    callback();
                }
            } else {
                console.log('保存失败');
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
    url = dealUrl(url);

    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(param), {}).then(function (res) {
            if (res.status === 200) {
                // console.log('res', res);
                if (res.data.isOk) {
                    // dispatch({type:LOGIN_IN,info:param});//可以这样写 但是可能感觉 可读性上面没那么好 毕竟才接触  以后再回来看了再说吧   还是先按照下面这种来写吧
                    dispatch(loginIn(param));
                    resolve(res.data);
                } else {
                    console.log('账号或密码错误');
                    reject('账号或密码错误');
                }
            } else {
                console.log('error');
            }
        }).catch(function (e) {
            console.log('未知错误', e);
        });
    }).catch((e) => {
        console.log('error', e);
    });

};


export const getTags = () => {

};


function dealUrl(url) {
    return BASE_URL + url;
}


/*******
 * 通过id  获取文章内容
 * @param url
 * @param params
 * @param callback
 * @returns {*}
 */
export const getArticleForId = (url, params, callback) => {
    return postUrl(url, params).then((res) => {
        if (callback) {
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
export const postUrl = (url, params, hint = '') => {
    url = dealUrl(url);
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(params), {}).then(function (res) {
            if (res.status === 200) {
                if (res.data.isOk) {
                    resolve(res.data)
                } else {
                    console.log('操作失败', hint);
                }
            }
        }).catch((e)=>{
            console.log('未知错误', e);
        });
    }).catch((e) => {
        console.log('未知错误', e);
    });

};


/*******
 * 公共get请求封装
 * @param url
 * @param params
 * @returns {Promise<any | never>}
 */
export const getUrl = (url, params, isAllUrl = false) => {
    const newUrl = isAllUrl ? url : dealUrl(url);

    return new Promise((resolve, reject) => {
        axios.get(newUrl, {params: params}).then(function (res) {
            if (res.status === 200) {
                resolve(res.data);
            } else if (res.status === 404) {
                console.log('not found');
                reject();
            }
        }).catch((e)=>{
            console.log('未知错误', e);
        });
    }).catch((e) => {
        console.log('未知错误', e);
    })

};
