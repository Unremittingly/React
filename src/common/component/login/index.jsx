import React, {Component} from 'react'
import {connect} from "react-redux";
import {Modal, Input} from "antd";
import './index..scss'
import {loginIn,loginOut} from "../../../redux/userInfo/action";


class Login extends Component {

    state = {
        isLogin: false,
        isPopShow: false,
    };

    componentWillMount() {
        this.setState({
            isLogin:this.props.loginInfo.isLogin
        })
    }

    loginIn() {
        this.setState({
            isPopShow: true
        })
    }
    loginOut(){
        this.props.loginOut(()=>{
            this.setState({
                isLogin:false
            })
        });
    }
    handleOk() {
        let userName = this.userInput.state.value;
        let password = this.pwdInput.state.value;
        this.setState({
            isPopShow: false,
            userName,
            password
        });
        this.props.loginIn({
            userName,
            password
        }, () => {
            this.setState({
                className: "hidden"
            });
        });
        console.log('this', this.props);
        console.log('1111222', this.props.pState);

    }

    handleCancel(e) {
        this.setState({
            isPopShow: false
        })
    }
    createLoginDom() {
        return (
            <div>
                <Input placeholder="用户名" ref={input => this.userInput = input} defaultValue={this.state.userName}/>
                <Input placeholder="密码" ref={input => this.pwdInput = input} defaultValue={this.state.password}/>
            </div>
        )
    }
    render() {
        return (
            <div>
                <div className={this.props.loginInfo.isLogin ? "hidden" : "login-info"}>
                    <span className="login-btn" onClick={this.loginIn.bind(this)}>登录</span>
                    <span className="register-btn">注册</span>
                    <Modal maskClosable={false} visible={this.state.isPopShow} onCancel={this.handleCancel.bind(this)}
                           onOk={this.handleOk.bind(this)}>{this.createLoginDom()}</Modal>
                </div>
                <div className={!this.props.loginInfo.isLogin ? "hidden" : "login-info"}>
                    <span className="login-out" onClick={this.loginOut.bind(this)}>注销</span>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, state) => {

    return {
        loginIn: (info, f = () => {
        }) => {
            dispatch(loginIn());
            f();
        },
        loginOut:(f=()=>{})=>{
            dispatch(loginOut());
            f();
        }
    }
};

const mapStateToProps = (state) => {
    return {
        loginInfo: state.userInfo,
        pState: state
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
