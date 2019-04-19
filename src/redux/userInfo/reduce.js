import {GET_USER_INFO,LOGIN_IN,LOGIN_OUT} from "./constant";
import avator from "../../image/avator.jpg";
let defaultState = {
    isLogin:false,
    avatar:avator,
    name:'admin'
};
const userInfo = (state=defaultState,action)=>{
    switch (action.type) {
        case GET_USER_INFO:
            return {...state,data:action.data};
        case LOGIN_IN:
            return {...state,isLogin:true,info:action.info};
        case LOGIN_OUT:
            return {...state,isLogin:false,info:action.info};
        default:
            return {...state}
    }
};

export default  userInfo;
