import React,{Component} from 'react'
import Navigation from '../navigation'
import Sidebar from '../sidebar'



class Layout extends Component{

    render() {
        return (
            <div className="layout">
                <Navigation/>

                <Sidebar/>
            </div>


        )
    }
}
export default Layout