import React, {Component} from "react";
import Layout from "../../common/layout"
import Filter from "./component/filter"
import "./index..scss"
import {connect} from "react-redux";

import {getArticles} from '../../helpers/dataManage'



import { List, Avatar, Icon } from 'antd';


const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);

class Article extends Component {
    state = {
        name: "404",
        code: 3,
        listData:[]
    };

    componentDidMount() {
        this.props.getList();

        for (let i = 0; i < 10; i++) {
            this.state.listData.push({
                href: 'http://ant.design',
                title: `ant design part ${i}`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            });
        }
    }

    render() {

        let listData = this.state.listData;

        return (
            <div className="article-list">
                <Layout {...this.props.state}  >
                    <div className="article">
                        <span >redux测试：{this.props.test.data}</span>
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
                            // footer={<div><b>ant design</b> footer part</div>}
                            renderItem={item => (
                                <List.Item
                                    key={item.title}
                                    actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                                    extra={<img width={200} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={<a href={item.href}>{item.title}</a>}
                                        description={item.description}
                                    />
                                    {item.content}
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
