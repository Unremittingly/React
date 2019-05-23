import React,{Component} from 'react'
import Navigation from '../navigation'
import Sidebar from '../sidebar'
import './index..scss'

class Layout extends Component{

    render() {
        let {children} = this.props;
        return (
            <div className="layout">
                <Navigation/>
                <div className='contain'>
                    {children}
                </div>
                <Sidebar/>
            </div>
        )
    }
}
export default Layout