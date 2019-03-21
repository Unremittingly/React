import {GET_USER_INFO,LOGIN_OUT,LOGIN_IN} from "./constant";

export const getUserInfo = (action)=>{
    return {type:GET_USER_INFO,data:action.data}
};

export const loginIn = (info)=>{
    return {type:LOGIN_IN,info}
};

export const loginOut = ()=>{
  return {type:LOGIN_OUT}
};





