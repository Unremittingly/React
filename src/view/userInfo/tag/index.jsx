import React,{Component} from 'react';
import {
    Tag, Input, Icon,
} from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import './index..scss'


class Tags extends Component {
    state = {
        tags: ['游戏宅', '音乐爱好者', '佛系码农','随缘人生','Bug制造者','困难群众'],
        inputVisible: false,
        inputValue: '',
    };

    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    };
    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    };

    saveInputRef = input => this.input = input;

    forMap = (tag) => {
        const tagElem = (
            <Tag
                color="blue"
                closable
                onClose={(e) => {
                    e.preventDefault();
                    this.handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        );
        return (
            <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
        );
    };

    render() {
        const { tags, inputVisible, inputValue } = this.state;
        const tagChild = tags.map(this.forMap);
        return (
            <div className="tags">

                <div className="tween-one-group" >
                    <span className="info-label">我的标签：</span> <TweenOneGroup className="info-con"
                        enter={{
                            scale: 0.8, opacity: 0, type: 'from', duration: 100,
                            onComplete: (e) => {
                                e.target.style = '';
                            },
                        }}
                        leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                        appear={false}
                    >
                        {tagChild}
                    </TweenOneGroup>
                </div>
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag
                        onClick={this.showInput}
                        style={{ background: '#fff', borderStyle: 'dashed' }}
                    >
                        <Icon type="plus" /> New Tag
                    </Tag>
                )}
            </div>
        );
    }
}



export default Tags;
