import React, {Component} from 'react';
import {Button} from "antd";
import {connect} from 'react-redux'
import Routers from '../../router/router'


// @connect(state=>({
//     state
// }))

class Navigation extends Component {
    state = {
        navList:[
            {
                name: '首页',
                path: 'home',
                component: Routers
            }
        ]

    };
    componentDidMount() {
        this.setState({
            navList:this.props.navList
        });
        console.log('this.',this.props.navList);
    }

    render() {
        return (
            <div className="navigation">
                <Button type="primary">首页</Button>
            </div>
        )
    }
}


export default  connect(state=>({
    navList:state
}))(Navigation);