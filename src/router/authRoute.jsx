import React,{Component} from 'react';
import {withRouter,Route,Redirect} from "react-router-dom";
import {connect} from 'react-redux';

class AuthRoute extends Component{
    render() {
        //没有权限的话 就重定向到首页
        return this.props.isLogin?(<Route path={this.props.path} key={this.props.key} component={this.props.component} />):
            (<Redirect to='/'/>)
    }
}

const mapStateToProps = (state)=>{
    return {
        isLogin:state.userInfo.isLogin
    }
};

export default connect(mapStateToProps)(withRouter(AuthRoute))
