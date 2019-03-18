import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from "react-router-dom"
import Routers from '../../router/router'
import './index..scss'

class Navigation extends Component {


    state = {
        navList: [
            {
                name: '首页',
                path: 'home',
                component: Routers
            }
        ]

    };

    componentDidMount() {
        this.setState({
            navList: this.props.navList
        });
    }


    render() {
        const listItems = this.props.navList.map((item) => {
            if (!item.auth) {
                return <Link to={item.path} key={item.id}>{item.name}</Link>;
            } else {
                //    需要login权限的
                if (this.props.isLogin) {
                    return <Link to={item.path} key={item.id}>{item.name}</Link>;
                }
            }

        });

        return (
            <div className="navigation">
                {listItems}
            </div>
        )
    }
}


export default connect(state => ({
    navList: state.common,
    isLogin: state.login.isLogin
}))(Navigation);
