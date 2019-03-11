import React,{Component} from 'react'
import './index..scss'

class Sidebar extends Component{
    render() {
        return (
            <div className='sidebar'>
                <div className='via'><img src='' alt='via'/></div>
                {/*最新*/}
                <div className='sidebar-item'>item1</div>
                <div className='sidebar-item'>item1</div>
                <div className='sidebar-item'>item1</div>
                <div className='sidebar-item'>item1</div>
                {/*所有*/}

            </div>
        )
    }
}

export default Sidebar;