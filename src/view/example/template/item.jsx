import React,{Component} from 'react'
import './item..scss'

class Item extends Component{
    render() {
        return (
            <div className="example-item">
                <div className="item-tit">{this.props.name} <span className="git">git地址：<a href={this.props.gitUrl} target="_Blank">戳这里</a></span></div>
                <div className="item-con">{this.props.children}</div>
            </div>
        )
    }
}

export default Item;
