import home from '../view/home'
import UserInfo from '../view/userInfo'
import notFound from '../view/notFound'
import article from '../view/article'
import edit from '../view/article/edit'
import test from '../view/test'
import example from '../view/example'
import detail from '../view/article/detail'
import Music from '../view/music'
import Novel from "../view/novel";
// import FlightChoose from "../view/test1";


export const childRoutes = [
    {
        id: 1,
        path: '/info',
        name: '个人中心',
        component: UserInfo,
        auth: false,
        isNav:true,
    },//这个router需要权限  多加一个属性
    {
        id: 2,
        path: '/',
        name: '首页',
        component: home,
        auth: true,
        isNav:true,
    },
    {
        id: 3,
        path: '/article',
        name: '文章',
        component: article,
        auth: false,
        isNav:true,
    },
    {
        id: 4,
        path: '/edit',
        name: '文章编辑',
        component: edit,
        auth: true,
        isNav:false
    },
    {
        id: 5,
        path: '/article/detail/:id',
        name: '文章详情',
        component: detail,
        auth: false,
        exact: true,
        isNav:false,
    },
    {
        id: 6,
        path: '/test',
        component: test,
        auth: false,
        isNav:false,
    },
    {
        id: 7,
        path: '/example',
        name: '实例',
        component: example,
        auth: false,
        isNav:true
    },
    {
        id: 8,
        path: '/music',
        name: '音乐',
        component: Music,
        auth: false,
        isNav:true,
    },
    {
        id: 9,
        path: '/novel',
        name: '小说',
        component: Novel,
        auth: false,
        isNav:true,
    },
    // {path:'/test1',component:FlightChoose,auth:false},
    {
        path: '*',
        component: notFound,
        auth: false
    }
];

export default {
    path: '/',
    name: 'home',
    component: home,
    childRoutes: childRoutes
}
