import React,{Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import "./pageNav.scss";

class PageNav extends Component {
  render() {
      let preData = this.props.preData;
      let nextData = this.props.nextData;
      return (
          <div className="page_nav">
              <div className="pre"><Link to="/article">{'<'+preData.name}</Link></div>
              <div className="next"><Link to="/article">{nextData.name+'>'}</Link></div>
          </div>
      )
  }
}

PageNav.propType = {
    preData:PropTypes.object,
    nextData:PropTypes.object
};

export default PageNav;
