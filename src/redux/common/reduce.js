import Home from "../../view/home";
import Article from "../../view/article"
import UserInfo from "../../view/application"
import notFound from "../../view/notFound"

const navList = ()=>{
    return  [
        {
            id:1,
            name:'首页',
            path:'/',
            component:Home,
        },
        {
            id:2,
            name:'文章管理',
            path:'/article',
            component:Article
        },
        {
            id:3,
            name:'个人中心',
            path:'/info',
            component:UserInfo
        },
        {
            id:4,
            name:'404',
            path:'/404',
            component:notFound
        }
    ];
};

export default navList;