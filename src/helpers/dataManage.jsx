import axios from 'axios'
import {getList} from '../redux/article/action'
import {GET_LIST} from "../redux/article/constant";

export const getArticles =  (url,params,dispatch)=>{
    dispatch(getList({
        data:'test',
        state:false
    }));

    // axios.post(url,params).then(function (res) {
    //     if (res.code === 200){
    //         dispatch(getList(GET_LIST,res));
    //     } else if(res.code === 404){
    //         console.log('not found');
    //     }
    // },function (error) {
    //
    // }).catch(function (error) {
    //     console.log('error',error);
    // });
};

export const getToken = ()=>{

};

export const getTags = ()=>{

};


