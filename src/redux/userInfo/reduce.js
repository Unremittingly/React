import {GET_USER_INFO,LOGIN_IN,LOGIN_OUT} from "./constant";

let loginState = {
    isLogin: false,
    userName:'test',
    pwd:'123456'
};
const userInfo = (state,action)=>{
    switch (action.type) {
        case GET_USER_INFO:
            return {...state,data:action.data?action.data:loginState};
        case LOGIN_IN:
            return {...state,data:action.data?action.data:loginState,status:action.status};
        case LOGIN_OUT:
            return {...state,status:action.status};
        default:
            return {...state,data:loginState}
    }
};

export default  userInfo;
