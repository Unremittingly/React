import React,{Component} from 'react'
import './item..scss'

class Item extends Component{
    render() {
        return (
            <div>
                <div className="item_tit">{this.props.name} <span className="git">git地址：<a href={this.props.gitUrl}>戳这里</a></span></div>
                <div className="item_con">{this.props.children}</div>
            </div>
        )
    }
}

export default Item;
