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
        this.html1 = ' <p><span style="font-weight: bold">放大发放</span>&nbsp; tst</p>';
    }

    state = {
        name: "404",
        code: 3,
        listData: this.props.resData
    };

    componentWillMount() {

    }

    updateData() {

        let list = [];
        console.log('resData.', this.props.resData);

        // this.setState({
        //     listData:this.props.resData
        // });
        this.props.resData.forEach((value) => {
            // value.description = value['description'];
            value['avatar']='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
            list.unshift(value);
        });
        return list;
    }

    componentDidMount() {
        this.props.getList();

        console.log('didMount');
        // let listData = [];
        // for (let i = 0; i < 10; i++) {
        //     listData.push({
        //         href: 'http://ant.design',
        //         title: `ant design part ${i}`,
        //         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        //         description: ' Ant Design, a design language for background applications, is refined by Ant UEDTeam.',
        //     });
        // }
        //
        // this.setState({
        //     listData
        // })
    }

    render() {

        let listData = this.state.listData;

        // listData = listData.length>0 ? listData :this.state.listData;

        console.log('state',this.props.state1);
        return (
            <div className="article-list">
                <Layout {...this.props.state}  >
                    <div className="article">
                        <div dangerouslySetInnerHTML={{__html: this.html1}}/>
                        <span>redux测试：{this.props.test.test}</span>
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
                                    key={item.title}
                                    actions={[<IconText type="star-o" text="156"/>, <IconText type="like-o" text="156"/>, <IconText type="message" text="2"/>]}
                                    extra={<img width={200} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar}/>}
                                        title={<a href={item.href}>{item.title}</a>}
                                        description={item.description}

                                    />
                                    <div dangerouslySetInnerHTML={{__html: item.content}} />
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
        state1:state
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getList: function () {

            let that = this;
            getArticles('http://localhost:3009/article', {user: 'username', pwd: '123456'}, dispatch,
                (data)=>{
                    that.setState({
                    listData:data
                })
                });
            // dispatch(getList("username", "123456"));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Article)
