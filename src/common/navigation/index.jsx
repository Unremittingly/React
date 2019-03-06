import React,{Component} from 'react';
import {Button} from "antd";
import {connect} from 'react-redux'
import Routers  from '../../router/router'



@connect(state=>({

}))
class Navigation extends Component{

    constructor(props) {
        super(props);
        this.state = [
            {
                name:'首页',
                path:'home',
                component:Routers
            }
        ];
    }


    render() {
        return (
            <div className="navigation">
                <Button type="primary">首页</Button>
            </div>
        )
    }
}

export default Navigation;