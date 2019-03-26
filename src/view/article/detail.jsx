import React,{Component} from 'react'
import Layout from '../../common/layout'
import {getArticles} from "../../helpers/dataManage";

class Detail extends Component{

    state={
        listData:[]
    };

    componentDidMount() {
        getArticles('http://localhost:3009/article', {user: 'username', pwd: '123456'},
            (data) => {
                console.log('data', data);
                this.setState({
                    listData: data.data
                });
            });
    }

    render() {
        let item = this.state.listData[0] ?this.state.listData[0]:{
            title:'test标题',
            content:'内容'
        };
        return (
            <Layout>
                <div className="article-detail">
                    <div className="title">{item.title}</div>

                    <div dangerouslySetInnerHTML={{__html: item.content}}/>
                </div>
            </Layout>

        )
    }
}

export default Detail;
