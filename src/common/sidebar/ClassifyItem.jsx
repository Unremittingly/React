import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import PropType from 'prop-types'
import './classfiyItem..scss';


class ClassifyItem extends Component {

    getNewListDom(data) {
        let doms = [];
        let length = data.length;
        for (let i = length - 1; i >= 0; i--) {
            let item = data[i];
            if (item.url) {
                doms.push(<a key={i} className="sidebar-item" href={item.url}  rel="noopener noreferrer" target="_blank">{item.title}</a>);
            } else {
                doms.push(<Link key={i} className="sidebar-item" target="_blank" rel="noopener noreferrer" to={"/article/detail/" + item.id}>{item.title}</Link>);
            }

            if (i < length - 3) {
                break;
            }
        }
        return doms.length>0?doms:<div className="no-content">暂无内容</div>;
    }

    render() {
        let {title,data} = this.props.list;
        return (
            <div className="classify-item">
                {/*最新*/}
                <div className="item-tit" >{title}</div>
                {this.getNewListDom(data)}
                {/*所有*/}
            </div>
        );
    }
}

ClassifyItem.propTypes = {
    list: PropType.object
};

export default ClassifyItem;


