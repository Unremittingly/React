import {GET_USER_INFO,LOGIN_OUT,LOGIN_IN} from "./constant";

export const getUserInfo = (action)=>{
    return {type:GET_USER_INFO,data:action.data}
};

export const loginIn = (action)=>{
    return {type:LOGIN_IN,data:action.data,status:action.status}
};

export const loginOut = (action)=>{
    return {type:LOGIN_OUT,status:action.status}
};
