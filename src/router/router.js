import home from '../view/home'
import UserInfo from '../view/userInfo'
import notFound from '../view/notFound'
import article from '../view/article'
import edit from '../view/article/edit'
import test from '../view/test'
import example from '../view/example'
import detail from '../view/article/detail'
import Music from '../view/music'
// import FlightChoose from "../view/test1";

export default {
    path: '/',
    name: 'home',
    component: home,
    childRoutes: [
        {path: '/info', component: UserInfo, auth: false},//这个router需要权限  多加一个属性
        {path: '/home', component: home, auth: false},
        {path: '/article', component: article, auth: false},
        {path: '/edit', component: edit, auth: true},
        {path: '/article/detail/:id', component: detail, auth: false,exact:true},
        {path: '/test', component: test, auth: false},
        {path: '/example', component: example, auth: false},
        {path: '/music', component:Music, auth:false},
        // {path:'/test1',component:FlightChoose,auth:false},
        {path: '*', component: notFound, auth: false}
    ]
}
