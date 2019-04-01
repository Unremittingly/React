import React, {Component} from "react"
import "./index..scss"
import avator from '../../image/avator.jpg'
import ClassifyItem from './ClassifyItem'

class Sidebar extends Component {
    //最新文章
    render() {
        return (
            <div className="sidebar">
                <div className="via">
                    <img src={avator} alt="via"/>
                </div>
                <ClassifyItem/>


            </div>
        )
    }
}

export default Sidebar;
