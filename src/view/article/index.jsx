import React, {Component} from "react";
import Layout from "../../common/layout"
import "./index..scss"
import {connect} from "react-redux";

import {getArticles} from '../../helpers/dataManage'

class Article extends Component {
    state = {
        name: "404",
        code: 3
    };

    componentDidMount() {
        this.props.getList();
    }

    render() {

        return (
            <div>
                <Layout {...this.props.state}  >
                    <div className="article">
                        <div className="title">
                            <span className="text">标签{this.props.test.data}</span>
                            <span className="time">2018/10/12</span>
                            <span className="tag">标签</span>
                        </div>
                        <div className="content">内容</div>
                    </div>
                </Layout>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        test: state.article
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getList: () => {
            getArticles('http://localhost:3009/article',{user:'username',pwd:'123456'},dispatch);
            // dispatch(getList("username", "123456"));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Article)
