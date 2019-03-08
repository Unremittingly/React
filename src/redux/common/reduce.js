import Home from "../../view/home";
import Login from "../../view/login";

const navList = ()=>{
    let list = [
        {
            name:'首页',
            path:'/',
            component:Home,
        },
        {
            name:'登录',
            path:'/login',
            component: Login
        }
    ];


    return list;
};

export default navList;