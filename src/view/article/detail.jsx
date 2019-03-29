import React, {Component} from 'react'
import Layout from '../../common/layout'
import {getArticleForId} from "../../helpers/dataManage";
import {getType} from "./classify";
import {timeFormat} from "../../helpers/fuc";

import './detail..scss'
import ReactMarkdown from 'react-markdown'

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

    render() {
        let result = this.state.data;
        //1  富文本  2 markDown
        let tabType = result.tabtype;
        console.log('this',tabType);
        let content = '';
        if (tabType == 1) {
            content = <div className="content" dangerouslySetInnerHTML={{__html: this.state.data.content}}/>;
        } else {
            content = <div className="content"><ReactMarkdown source={result.content}/></div>
        }
        return (
            <Layout>
                <div className="article-detail">
                    <div className="title">
                        <div className="title-t">{result.title}</div>
                        <div className="title-o">
                            <span className="time">{timeFormat(result.time)}</span>
                            <span className="type">{getType(result.type)}</span>
                            <span className="tag">{result.tag ? result.tag : '未知标签'}</span>
                        </div>
                    </div>
                    {content}
                </div>
            </Layout>

        )
    }
}

export default Detail;
