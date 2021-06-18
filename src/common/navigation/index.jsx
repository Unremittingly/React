import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from "react-router-dom"
import Login from '../component/login'
import './index..scss'
import {childRoutes} from "../../router/router";

class Navigation extends Component {

    state = {};

    clickHandle(id) {
        const {navList} = this.props;
        for (let i = 0; i < navList.length; i++) {
            let item = navList[i];
            if (item.id === id) {
                item.active = true;
                // break;
            }else{
                item.active = false;
            }
        }
    }

    render() {
        const {isLogin} = this.props;
        const listItems = childRoutes.map((item) => {

            if (item.isNav) {
                if(!item.auth){
                    return <Link className={item.active?'active':''} onClick={()=>this.clickHandle(item.id)} to={item.path} key={item.id}>{item.name}</Link>;
                }else{
                    return <Link className={item.active?'active':''} to={item.path} key={item.id}>{item.name}</Link>;
                }
            } else {
                return '';
            }

        });

        return (
            <div>
                <Login test={123}/>
                <div className="navigation">
                    {listItems}
                </div>
            </div>
        )
    }
}


export default connect(state => ({
    navList: state.common,
    isLogin: state.userInfo.isLogin
}))(Navigation);
