import React,{Component} from 'react'

import './item..scss'
import PropType from 'prop-types';

class Item extends Component{
    render() {
        return (
            <div className="example-item">
                <div className="item-tit">{this.props.name} <span className="git">git地址：
                    <a href={this.props.gitUrl} target="_Blank" rel="noopener noreferrer">戳这里</a>
                </span>
                </div>
                <div className="item-con">{this.props.children}</div>
            </div>
        )
    }
}
Item.propTypes = {
    name:PropType.string,
    gitUrl:PropType.string
};

export default Item;
