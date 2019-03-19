import {GET_USER_INFO,LOGIN_IN,LOGIN_OUT,VERIFY_INFO} from "./constant";

const userInfo = (state={isLogin:false},action)=>{
    switch (action.type) {
        case GET_USER_INFO:
            return {...state,data:action.data};
        case LOGIN_IN:
            return {...state,isLogin:true};
        case LOGIN_OUT:
            return {...state,isLogin:false};
        default:
            return {...state}
    }
};

export default  userInfo;
