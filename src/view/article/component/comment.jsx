import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './comment..scss'
// import avator from '../../../image/avator.jpg'

import {
    Comment, Avatar, Form, Button, List, Input,
} from 'antd';
import moment from 'moment';
import {connect} from "react-redux";
import {postUrl} from "../../../helpers/dataManage";


const TextArea = Input.TextArea;

const CommentList = ({comments}) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({
                    onChange, onSubmit, submitting, value,
                }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value}/>
        </Form.Item>
        <Form.Item>
            <Button
                className="comment-btn"
                htmlType="submit"
                loading={submitting}
                onClick={onSubmit}
                type="primary"
            >
                发表评论
            </Button>
        </Form.Item>
    </div>
);

class Comments extends Component {
    state = {
        comments: [],
        submitting: false,
        value: '',
        avatar:this.props.userInfo.avatar
    };

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    {
                        author: this.props.userInfo.name,
                        avatar: this.state.avatar,
                        content: <p>{this.state.value}</p>,
                        datetime: moment().fromNow(),
                    },
                    ...this.state.comments,
                ],
            });
        }, 1000);

        postUrl('http://localhost:3009/addComment',{
            commentId:this.props.commentId,
            articleId:this.props.articleId,
            content: this.state.value
        }).then((data)=>{
            console.log('comment',data);
        })
        //add Comment
    };
    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const {comments, submitting, value} = this.state;

        // let articleId = this.props.articleId;
        // let commentId = this.props.commentId;
        // console.log('id', articleId, commentId);

        return (
            <div className="comment">
                {comments.length > 0 && <CommentList comments={comments}/>}
                <Comment
                    avatar={(
                        <Avatar
                            src={ this.state.avatar}
                            alt={this.props.userInfo.name}
                        />
                    )}
                    content={(
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    )}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }

};

Comments.propType = {
    articleId: PropTypes.number,
    commentId: PropTypes.number
};

export default connect(mapStateToProps)(Comments);
