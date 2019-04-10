import React, {Component} from "react";
import Layout from "../../common/layout"
import Filter from "./component/filter"
import "./index..scss"
import {connect} from "react-redux";
import {getArticles, postUrl} from '../../helpers/dataManage'
import {List, Avatar, Icon,message} from 'antd';

const IconText = ({onClick,type, text}) => (
    <span onClick={onClick}>
    <Icon  type={type} style={{marginRight: 8}}/>
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
        this.props.history.push("/article/detail/" + id);
    }

    getSearchParam(params) {
        console.log(params);
        //每次筛选都会经过这里   这里需要调用search接口来返回数据
        // console.log('params', Date.parse(params.time)/1000);

        postUrl('http://localhost:3009/search', {
            time: Date.parse(params.time) / 1000,
            type: params.type,
            str: params.str
        }).then((data) => {
            console.log('this', this.state);
            this.setState({
                listData: data.data
            });
        });
    }

    deleteArticle(e,id) {
        console.log('1',id);
        postUrl('http://localhost:3009/deleteArticle',{
            id:id
        }).then((data)=>{
            if(data.isOk){
                message.success('删除成功！', 3);
                window.location.reload();
            }

        });
        e.stopPropagation();

    }

    createIcon(id) {
        let iconArr = [<IconText type="star-o" text="0"/>, <IconText type="like-o" text="0"/>,
            <IconText type="message" text="0"/>];
        if (this.props.isLogin) {
            iconArr.push(<IconText onClick={(e)=>this.deleteArticle(e,id)} type="delete-o" text="删除"/>);
        }

        return iconArr;
    }

    render() {
        let listData = this.state.listData;

        return (
            <div className="article-list">
                <Layout {...this.props.state}  >
                    <div className="article">
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
                                    actions={this.createIcon(item.id)}
                                    extra={<img width={200} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar}/>}
                                        title={<a href={item.href}>{item.title}</a>}
                                        description={item.description ? item.description.substring(0, 13) + '...' : ''}
                                    />
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
        isLogin: state.userInfo.isLogin  //管理员是否登录
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Article)
