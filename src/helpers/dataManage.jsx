import axios from 'axios'
import {getList} from '../redux/article/action'
import {loginIn} from "../redux/userInfo/action";
import qs from 'qs';

export const getArticles = (url, params, dispatch) => {
    axios.get(url,{params:params}).then(function (res) {
        console.log('res', res);
        if (res.status === 200) {
            dispatch(getList({
                data: res.data.test,
                state: false
            }));
        } else if (res.status === 404) {
            console.log('not found');
        }
    }, function (error) {

    }).catch(function (error) {
        console.log('error', error);
    });
};

export const login = (url, param, dispatch, callback) => {


    axios.post(url, qs.stringify(param), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (res) {
        if (res.status === 200) {
            console.log('res', res);
            if (res.data.isOk) {
                dispatch(loginIn(param));
                callback(res.data.isOk);
            } else {
                callback(res.data.isOk);
                console.log('账号或密码错误');
            }

        } else {
            console.log('error');
        }
    }).catch(function (e) {
        console.log('未知错误', e);
    })


};

export const getToken = () => {

};

export const getTags = () => {

};


