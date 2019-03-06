import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';
import Routers from './router/router'
import 'antd/dist/antd.css'


class App extends Component {
    constructor(props) {
        super(props);
        this.baseUrl = '/';
    }


    renderRouters(){
        let routers = [];

        routers.push(<Route exact  key={Routers.path} path={Routers.path} component={Routers.component} />);

        Routers.childRoutes.forEach(function (item) {
            routers.push( <Route key={item.path} path={item.path} component={item.component}/>);
        });

        console.log('routers',routers);
        return routers;
    }
    render() {
        const children = this.renderRouters();
        return (<BrowserRouter><Switch>
            {children}
        </Switch></BrowserRouter>);
    }
}

export default App;
