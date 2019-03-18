import Home from "../../view/home";
import Article from "../../view/article"
import edit from '../../view/article/edit'
import UserInfo from "../../view/application"
import Test from '../../view/test'
import Example from "../../view/example";


const navList = () => {
    return [
        {
            id: 1,
            name: '首页',
            path: '/',
            component: Home,
        },
        {
            id: 2,
            name: '文章管理',
            path: '/article',
            component: Article
        },
        {
            id:3,
            name:'文章编辑',
            path:'/edit',
            component:edit,
            auth:true

        },
        {
            id: 4,
            name: '个人中心',
            path: '/info',
            component: UserInfo,
            auth: true
        },
        {
            id: 5,
            name: 'test',
            path: '/test',
            component: Test
        },
        {
            id: 6,
            name: '实例',
            path: '/example',
            component: Example
        }
    ];
};

export default navList;
