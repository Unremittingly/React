import React, {Component} from "react";
import Layout from "../../common/layout"
import Filter from "./component/filter"
import "./index..scss"
import {connect} from "react-redux";
import {getArticles, postUrl} from '../../helpers/dataManage'
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
        this.getSearchParam = this.getSearchParam.bind(this);
    }


    state = {
        name: "404",
        code: 3,
        listData: []//这个页面独有的文章list
    };


    componentDidMount() {
        getArticles('http://localhost:3009/article', {user: 'username', pwd: '123456'},
            (data) => {
                this.setState({
                    listData: data.data
                });
            });
    }

    clickHandle(id) {
        this.props.history.push("/article/detail/"+id);
    }
    getSearchParam(params){
        console.log(params);
        //每次筛选都会经过这里   这里需要调用search接口来返回数据
        // console.log('params', Date.parse(params.time)/1000);

        postUrl('http://localhost:3009/search',{
            time: Date.parse(params.time)/1000,
            type:params.type,
            str:params.str
        }).then( (data)=> {
            console.log('this',this.state);
            this.setState({
                listData: data.data
            });
        });
    }

    render() {

        let listData = this.state.listData;

        return (
            <div className="article-list">
                <Layout {...this.props.state}  >
                    <div className="article">
                        {/*<span>redux测试：{this.props.test.test}</span>*/}
                        <Filter getSearchParam={this.getSearchParam}/>
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
