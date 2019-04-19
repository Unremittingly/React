import React, {Component} from 'react'
import {connect} from "react-redux";
import {Modal, Input} from "antd";
import './index..scss'
import {loginOut} from "../../../redux/userInfo/action";
import {login} from "../../../helpers/dataManage";

import PropType from 'prop-types'

//使用proptype检测类型

class Login extends Component {

    state = {
        isLogin: false,
        isPopShow: false,
    };

    componentWillMount() {
        this.setState({
            isLogin: this.props.loginInfo.isLogin
        })
    }

    loginIn() {
        this.setState({
            isPopShow: true
        })
    }

    loginOut() {
        this.props.loginOut(() => {
            this.setState({
                isLogin: false
            })
        });
    }

    handleOk() {
        let userName = this.userInput.state.value;
        let password = this.pwdInput.state.value;
        let that = this;
        //验证

        this.props.loginTest({
            userName,
            password
        }, () => {
            that.setState({
                isPopShow: false,
                userName,
                password
            });
        });

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
                <Input placeholder="密码" type="password" ref={input => this.pwdInput = input} defaultValue={this.state.password}/>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className={this.props.loginInfo.isLogin ? "hidden" : "login-info"}>
                    <span className="login-btn" onClick={this.loginIn.bind(this)}>登录</span>
                    {/*<span className="register-btn">注册</span>*/}
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

const mapDispatchToProps = (dispatch) => {

    return {
        loginIn: (info, f = () => {
        }) => {
            //使用Generator  和yield 模式来将异步变成同步
            let l = login('http://localhost:3009/login', info, dispatch);
            l.next().value.then(function () {
                //因为第一次返回的是一个promise 这里需要再写一次next()
                let result = l.next().value.data;
                if (result && result.isOk) {
                    f();
                }
                if (!result) {
                    console.log('未知错误');
                }
            })

        },
        loginOut: (f = () => {
        }) => {
            dispatch(loginOut());
            f();
        },
        loginTest: (info, f = () => {
        }) => {
            dispatch(() => {
                //返回一个promise 对象
                login('http://localhost:3009/login', info, dispatch).then((result) => {
                    console.log('result',result);
                    if (result && result.isOk) {
                        f();
                    }
                    if (!result) {
                        console.log('未知错误');
                    }
                });

            });
            console.log('redux-thunk 后面');
        }
    }
};

const mapStateToProps = (state) => {
    return {
        loginInfo: state.userInfo,
        pState: state
    }
};
Login.propTypes = {
    test: PropType.number
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
