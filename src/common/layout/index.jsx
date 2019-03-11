import React,{Component} from 'react'
import Navigation from '../navigation'
import Sidebar from '../sidebar'
import './index..scss'

class Layout extends Component{

    render() {
        return (
            <div className="layout">
                <Navigation/>
                <div className='contain'>
                    {this.props.children}
                </div>
                <Sidebar/>
            </div>
        )
    }
}
export default Layout