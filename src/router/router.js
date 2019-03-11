import home from '../view/home'
import login from '../view/login'
import application from '../view/application'
import notFound from '../view/notFound'
import article from '../view/article'
import test from  '../view/test'

export default {
    path: '/',
    name: 'home',
    component: home,
    childRoutes: [
        {path: '/login', component: login},
        {path: '/info', component: application},
        {path: '/home', component: home},
        {path: '/article', component: article},
        {path:'/test',component:test},
        {path: '*', component: notFound}
    ]
}