import React, {Component} from 'react'
import Layout from '../../common/layout'
import {getArticleForId} from "../../helpers/dataManage";
import {getType} from "./classify";
import {timeFormat} from "../../helpers/fuc";

import './detail..scss';
import ReactMarkdown from 'react-markdown';
import Comment from './component/comment';

import PageNav from './component/pageNav';

class Detail extends Component {

    state = {
        data: {},
        params: this.props.match.params,
        pageNavData: this.props.location.query,
    };

    componentDidMount() {
        const id = this.state.params.id;
        getArticleForId('/getArticle', {id},
            (data) => {
                this.setState({
                    data:data[0]
                });
            });
    }

    componentWillReceiveProps(nextProps, nextContent) {
        // console.log('newx', nextProps.match);

        //这个url 带参数  需要这里重新处理一下  初始化  不然  从带参数的切换到另一个参数的过后 页面不会改变
        let id = nextProps.match.params.id;

        getArticleForId('/getArticle', {id: id},
            (data) => {
                this.setState({
                    data:data[0]
                });
            });
        this.setState({
            params: nextProps.match.params
        })
    }

    saveSession(data) {
        if (data.pre && data.next) {
            sessionStorage.setItem('detail', JSON.stringify(data));
        }

    }

    getPageNav() {
        let pAndN = sessionStorage.getItem('detail');
        if (!this.state.pageNavData) {
            return JSON.parse(pAndN);
        } else {
            return this.state.pageNavData;
        }

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

        //todo 前端获取  可以不用的  直接请求api 获取   这里api获取也做啦  目前用的就是后台直接获取的
        let pageData = this.getPageNav();
        let pD = pageData.pre;
        let nD = pageData.next;
        this.saveSession(pageData);

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
                <PageNav preData={pD} nextData={nD} result={result} articleId={this.state.params.id}/>
                <Comment articleId={this.state.params.id} commentId={2}/>
            </Layout>

        )
    }
}

export default Detail;
