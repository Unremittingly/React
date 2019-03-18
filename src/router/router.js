import home from '../view/home'
import application from '../view/application'
import notFound from '../view/notFound'
import article from '../view/article'
import edit from '../view/article/edit'
import test from '../view/test'
import example from '../view/example'

export default {
    path: '/',
    name: 'home',
    component: home,
    childRoutes: [
        {path: '/info', component: application, auth: true},//这个router需要权限  多加一个属性
        {path: '/home', component: home, auth: false},
        {path: '/article', component: article, auth: false},
        {path: '/edit', component: edit, auth: true},
        {path: '/test', component: test, auth: false},
        {path: '/example', component: example, auth: false},
        {path: '*', component: notFound, auth: false}
    ]
}
