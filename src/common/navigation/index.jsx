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
            return <Link to={item.path} key={item.id}>{item.name}</Link>;
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
    state
}))(Navigation);
