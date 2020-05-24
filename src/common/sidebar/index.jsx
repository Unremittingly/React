import React, {Component} from "react"
import "./index..scss"
import avator from '../../image/avator.jpg'
import ClassifyItem from './ClassifyItem'
import {postUrl} from "../../helpers/dataManage";
import {Tag} from "antd";
import {connect} from "react-redux";
import {update} from "../../redux/newArticle/action.js";

let url = '/getRecent';//获取近期文章的api

class Sidebar extends Component {


    state = {
        newArticle: {
            "title": "最新文章",
            "data": [],
        },
        recommend: {
            "title": "推荐文章",
            "data": [
                {
                    "title": '十大经典算法',
                    "url": 'https://www.cnblogs.com/onepixel/articles/7674659.html'
                }
            ]
        },

        tags: [
            '游戏宅',
            '佛系码农'
        ]
    };

    componentDidMount() {

        console.log('1111',this.props);
        const {articleData,dispatch} = this.props;
        if(!articleData){
            postUrl(url, {
                test: 'test'
            }).then((result) => {
                this.setState({
                    newArticle: {
                        data: result.data,
                        title: '最新文章'
                    }
                });
                console.log('result.data',result.data);
                dispatch(update(result.data))
            })
        }else {
            this.setState({
                newArticle:{
                    data:articleData,
                    title:'最新文章'
                }
            })
        }

    }

    //最新文章
    render() {
        let {tags, newArticle, recommend} = this.state;
        return (
            <div className="sidebar">
                <div className="via">
                    <img src={avator} alt="via"/>
                    <div className="simple-tag">高级CV工程师</div>
                    {tags.map((tag, key) => {
                        return <Tag key={key} color="blue">{tag}</Tag>
                    })}

                </div>
                <ClassifyItem list={newArticle}/>
                <ClassifyItem list={recommend}/>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        articleData: state.newArticle.articleData  //管理员是否登录
    }
};

export default connect(mapStateToProps)(Sidebar)
