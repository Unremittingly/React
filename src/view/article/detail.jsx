import React, {Component} from 'react'
import Layout from '../../common/layout'
import {getArticleForId} from "../../helpers/dataManage";
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
                    <div className="title">{this.state.data.title}</div>
                    <div className="content" dangerouslySetInnerHTML={{__html: this.state.data.content}}/>
                </div>
            </Layout>

        )
    }
}

export default Detail;
