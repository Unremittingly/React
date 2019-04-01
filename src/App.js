import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';
import Routers from './router/router'
import 'antd/dist/antd.css'
import AuthRoute from './router/authRoute'




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
        return (<BrowserRouter><Switch>
            {children}
        </Switch></BrowserRouter>);
    }
}

export default   App;
