import {GET_USER_INFO,LOGIN_OUT,LOGIN_IN,VERIFY_INFO} from "./constant";

export const getUserInfo = (action)=>{
    return {type:GET_USER_INFO,data:action.data}
};

export const loginIn = ()=>{
    return {type:LOGIN_IN}
};

export const loginOut = ()=>{
  return {type:LOGIN_OUT}
};





