import React, {Component} from 'react';
import {getRecent, postUrl} from "../../helpers/dataManage";
import {Link} from 'react-router-dom'

import './classfiyItem..scss';


class ClassifyItem extends Component {


    state = {
        data: []
    };

    jumpArticle(id){
        console.log('   this.props.history',   this.props.history);
        this.props.history.push("/article/detail/"+id);
       console.log('id',id);
    }
    componentDidMount() {

        let url = 'http://localhost:3009/getRecent';
        postUrl(url, {}).then((result) => {
            console.log('data', result);
            this.setState({
                data: result.data
            })
        })

    }

    getListDom() {
        let doms = [];
        let length = this.state.data.length;
        console.log('length',length);
        for (let i = length-1; i >=0 ; i--) {
            let item = this.state.data[i];
            doms.push(<Link key={i} className="sidebar-item" to={"/article/detail/"+item.id}>{item.title}</Link>);
            if(i<length-3){
                break;
            }
        }

        return doms;
    }

    render() {
        let dd = this.state.data.slice(0, 4);
        return (
            <div className="classify-item">
                {/*最新*/}
                <div className="item-tit">最新文章</div>
                {this.getListDom()}
                {/*所有*/}
            </div>
        );
    }
}

export default ClassifyItem;


