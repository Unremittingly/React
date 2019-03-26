import React, {Component} from "react";
import Layout from "../../common/layout"
import Filter from "./component/filter"
import "./index..scss"
import {connect} from "react-redux";
import {getArticles} from '../../helpers/dataManage'
import {List, Avatar, Icon} from 'antd';


const IconText = ({type, text}) => (
    <span>
    <Icon type={type} style={{marginRight: 8}}/>
        {text}
  </span>
);

class Article extends Component {
    constructor(props) {
        super(props);

    }

    state = {
        name: "404",
        code: 3,
        listData: []//这个页面独有的文章list
    };


    componentDidMount() {
        getArticles('http://localhost:3009/article', {user: 'username', pwd: '123456'},
            (data) => {
                console.log('data', data);
                this.setState({
                    listData: data.data
                });
            });
        console.log('didMount');
    }

    clickHandle(id) {
        console.log('id', id);
    }

    render() {

        let listData = this.state.listData;

        return (
            <div className="article-list">
                <Layout {...this.props.state}  >
                    <div className="article">
                        {/*<span>redux测试：{this.props.test.test}</span>*/}
                        <Filter/>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 2,
                            }}
                            dataSource={listData}
                            renderItem={item => (
                                <List.Item
                                    data-id={item.id}
                                    key={item.title}
                                    onClick={this.clickHandle.bind(this, item.id)}
                                    actions={[<IconText type="star-o" text="156"/>, <IconText type="like-o" text="156"/>, <IconText type="message" text="2"/>]}
                                    extra={<img width={200} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar}/>}
                                        title={<a href={item.href}>{item.title}</a>}
                                        description={item.description ? item.description.substring(0, 13) + '...' : ''}
                                    />
                                    {/*<div dangerouslySetInnerHTML={{__html: item.content}}/>*/}
                                </List.Item>
                            )}
                        />,
                    </div>
                </Layout>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        test: state.article.data,
        resData: state.article.data,
        state1: state
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // getList: function () {
        //
        //     let that = this;
        //
        //     // dispatch(getList("username", "123456"));
        // }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Article)
