import Home from "../../view/home";
import Article from "../../view/article"
import UserInfo from "../../view/application"
import Test from '../../view/test'


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
            name:'test',
            path:'/test',
            component:Test
        }
    ];
};

export default navList;