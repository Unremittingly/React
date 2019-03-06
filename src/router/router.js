import home from '../view/home'
import login from '../view/login'
import application from '../view/application'
import notFound from '../view/notFound'

export default {
    path: '/',
    name: 'home',
    component: home,
    childRoutes: [
        {path: '/login', component: login},
        {path: '/application', component: application},
        {path: '/home', component: home},
        {path: '*', component: notFound}
    ]
}