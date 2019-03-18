import React, {Component} from 'react'
import ReactMarkdown from 'react-markdown'
import {Input} from "antd";
import Layout from "../../common/layout";
import './edit..scss'


class Edit extends Component {

    state = {
        str: '## 标题 title   \n  文本内容'
    };

    textChange(e) {
        this.setState({
            str: e.target.value
        })
    }

    render() {
        return (
            <Layout>
                <div className="article-edit">
                    <div className="edit-left" style={{'marginTop': 10}}>
                        <Input.TextArea defaultValue={this.state.str}  onChange={this.textChange.bind(this)}/>
                    </div>
                    <div className="edit-right"><ReactMarkdown source={this.state.str}/></div>
                </div>
            </Layout>
        )
    }
}


export default Edit
