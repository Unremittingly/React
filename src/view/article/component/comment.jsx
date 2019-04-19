import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './comment..scss'

import {
    Comment, Avatar, Form, Button, List, Input,
} from 'antd';
import moment from 'moment';

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

class Comments extends React.Component {
    state = {
        comments: [],
        submitting: false,
        value: '',
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
                        author: 'Han Solo',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content: <p>{this.state.value}</p>,
                        datetime: moment().fromNow(),
                    },
                    ...this.state.comments,
                ],
            });
        }, 1000);
    };
    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const {comments, submitting, value} = this.state;

        let articleId = this.props.articleId;
        let commentId = this.props.commentId;
        console.log('id',articleId,commentId);

        return (
            <div className="comment">
                {comments.length > 0 && <CommentList comments={comments}/>}
                <Comment
                    avatar={(
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
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


Comments.propType = {
    articleId: PropTypes.number,
    commentId: PropTypes.number
};

export default Comments;
