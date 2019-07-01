import React,{Component} from 'react'

import './item..scss'
import PropType from 'prop-types';

class Item extends Component{
    render() {
        const {name,children,gitUrl} = this.props;
        return (
            <div className="example-item">
                <div className="item-tit">{name} <span className="git">git地址：
                    <a href={gitUrl} target="_Blank" rel="noopener noreferrer">戳这里</a>
                </span>
                </div>
                <div className="item-con">{children}</div>
            </div>
        )
    }
}
Item.propTypes = {
    name:PropType.string,
    gitUrl:PropType.string
};

export default Item;
