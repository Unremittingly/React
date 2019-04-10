import React, {Component} from "react"
import "./index..scss"
import avator from '../../image/avator.jpg'
import ClassifyItem from './ClassifyItem'
import {postUrl} from "../../helpers/dataManage";

import {Tag} from "antd";

class Sidebar extends Component {


    state = {
        newArticle: {
            "title": "最新文章",
            "data": [],
        },
        recommend:{
            "title":"推荐文章",
            "data":[
                {
                    "title":'十大经典算法',
                    "url":'https://www.cnblogs.com/onepixel/articles/7674659.html'
                }
            ]
        },

        tags:[
            '游戏宅',
            '佛系码农'
        ]
    };



    componentDidMount() {

        let url = 'http://localhost:3009/getRecent';
        postUrl(url, {
            test:'test'
        }).then((result) => {
            this.setState({
                newArticle:{
                    data: result.data,
                    title:'最新文章'
                }
            });
        })


    }

    //最新文章
    render() {
        return (
            <div className="sidebar">
                <div className="via">
                    <img src={avator} alt="via"/>
                    <div className="simple-tag">高级CV工程师</div>
                    {this.state.tags.map((tag)=>{
                        return   <Tag
                            color="blue"
                        >{tag}</Tag>
                    })}

                </div>
                <ClassifyItem list={this.state.newArticle} />
                <ClassifyItem list={this.state.recommend} />

            </div>
        )
    }
}

export default Sidebar;
