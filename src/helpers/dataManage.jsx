import axios from 'axios'
import {getList} from '../redux/article/action'

export const getArticles =  (url,params,dispatch)=>{


    axios.get(url,params).then(function (res) {
        console.log('res',res);
        if (res.status === 200){
            dispatch(getList({
                data:res.data.data,
                state:false
            }));
        } else if(res.status === 404){
            console.log('not found');
        }
    },function (error) {

    }).catch(function (error) {
        console.log('error',error);
    });
};

export const getToken = ()=>{

};

export const getTags = ()=>{

};


