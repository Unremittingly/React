import React, {Component} from 'react'
import Layout from '../../common/layout'
import {getArticleForId} from "../../helpers/dataManage";
import {getType} from "./classify";
import {timeFormat} from "../../helpers/fuc";

import './detail..scss';
import ReactMarkdown from 'react-markdown';
import Comment from './component/comment'

class Detail extends Component {

    state = {
        data: {},
        params: this.props.match.params
    };

    componentDidMount() {
        getArticleForId('http://localhost:3009/getArticle', {id: this.state.params.id},
            (data) => {
                this.setState({
                    data
                });
            });
    }

    componentWillReceiveProps(nextProps, nextContent) {
        // console.log('newx', nextProps.match);

        //这个url 带参数  需要这里重新处理一下  初始化  不然  从带参数的切换到另一个参数的过后 页面不会改变
        let id = nextProps.match.params.id;

        getArticleForId('http://localhost:3009/getArticle', {id: id},
            (data) => {
                this.setState({
                    data
                });
            });
    }

    render() {
        let result = this.state.data;
        //1  富文本  2 markDown
        let tabType = result.tabtype;
        // console.log('this', tabType);
        let content = '';
        if (tabType === 1) {
            content = <div className="content" dangerouslySetInnerHTML={{__html: decodeURI(this.state.data.content)}}/>;
        } else {
            content = <div className="content"><ReactMarkdown source={decodeURI(result.content)}/></div>
        }
        return (
            <Layout>
                <div className="article-detail">
                    <div className="title">
                        <div className="title-t">{result.title}</div>
                        <div className="title-o">
                            <span className="time">{timeFormat(result.time)}</span>
                            <span className="type">{getType(result.type)}</span>
                            {/*<span className="tag">{result.tag ? result.tag : '未知标签'}</span>*/}
                            <span className="pView">阅读量：{result.count ? result.count : '0'}</span>
                        </div>
                    </div>
                    {content}
                </div>
                <Comment articleId={this.state.params.id} commentId={2}/>
            </Layout>

        )
    }
}

export default Detail;
