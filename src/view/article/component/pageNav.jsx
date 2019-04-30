import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import "./pageNav.scss";
import {postUrl} from "../../../helpers/dataManage";

class PageNav extends Component {


    state={
        data:{

        }
    };
    componentWillMount() {



    }
    componentWillReceiveProps(nextProps, nextContext) {
        let id = this.props.articleId;
        postUrl('http://localhost:3009/getPageNav',{articleId:id}).then((data)=>{
            console.log('data',data);
            this.setState({
                data
            })
        })
    }

    render() {
        let preData = this.state.data.pData?this.state.data.pData[0]: this.props.preData;
        let nextData = this.state.data.nData?this.state.data.nData[0]: this.props.nextData;
        preData = preData?preData:this.props.result;
        nextData = nextData?nextData:this.props.result;
        // console.log('p',preData);
        // console.log('n',nextData);
        // console.log('id', this.props.articleId);
        return (
            <div className="page_nav">
                <div className="pre"><Link to={"/article/detail/" + preData.id}>{'<' + preData.title}</Link></div>
                <div className="next"><Link to={"/article/detail/" + nextData.id}>{nextData.title + '>'}</Link></div>
            </div>
        )
    }
}

PageNav.propType = {
    preData: PropTypes.object,
    nextData: PropTypes.object,
    articleId: PropTypes.number,
    result:PropTypes.result
};

export default PageNav;
