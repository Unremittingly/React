import React, {Component} from 'react'
import Layout from '../../common/layout'
import {getArticleForId} from "../../helpers/dataManage";
import {getType} from "./classify";
import {timeFormat} from "../../helpers/fuc";

import './detail..scss'

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

        return (
            <Layout>
                <div className="article-detail">
                    <div className="title">
                        <div className="title-t">{this.state.data.title}</div>
                        <div className="title-o">
                            <span className="time">{timeFormat(this.state.data.time)}</span>
                            <span className="type">{getType(this.state.data.type)}</span>
                            <span className="tag">{this.state.data.tag?this.state.data.tag:'未知标签'}</span>
                        </div>
                    </div>

                    <div className="content" dangerouslySetInnerHTML={{__html: this.state.data.content}}/>

                </div>
            </Layout>

        )
    }
}

export default Detail;
