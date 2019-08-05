import React, {Component} from 'react';
//使用hashrouter   如果要改成historyrouter   直接改成  BrowerRouter as Router
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Routers from './router/router'
import 'antd/dist/antd.css'
import AuthRoute from './router/authRoute'

import './common/style/base..scss'




class App extends Component {


    renderRouters() {
        let routers = [];

        routers.push(<Route exact key={Routers.path} path={Routers.path} component={Routers.component}/>);
        Routers.childRoutes.forEach(function (item) {
            if(item.auth){
                //带登录权限的route
                routers.push(<AuthRoute key={item.path} exact path={item.path} component={item.component}/>);
            }else{
                routers.push(<Route key={item.path} exact  path={item.path} component={item.component}/>);
            }

        });

        return routers;
    }

    render() {
        const children = this.renderRouters();
        return (<Router><Switch>
            {children}
        </Switch></Router>);
    }
}

export default   App;
