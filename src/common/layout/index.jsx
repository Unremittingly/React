import React,{Component} from 'react'
import Navigation from '../navigation'
import Sidebar from '../sidebar'
import './index..scss'
// import Home from '../../view/home'
// import Article from '../../view/article'
// import NotFound from '../../view/notFound'
// import Info from '../../view/application'

class Layout extends Component{


    // renderChildren(){
    //     let child = <Home/>;
    //     //0.未找到404，1 首页  2.个人中心  3.文章
    //     switch (this.props.code) {
    //         case 0:
    //             child = <NotFound/>;
    //             break;
    //         case 1:
    //             child = <Home/>;
    //             break;
    //         case 2:
    //             child = <Info/>;
    //             break;
    //         case 3:
    //             child = <Article/>;
    //             break;
    //         case 4:
    //             break;
    //         case 5:
    //             break;
    //         default:
    //             break;
    //     }
    //
    //     return child;
    // }

    render() {
        return (
            <div className="layout">
                <Navigation/>
                <div className='contain'>
                    {/*{this.renderChildren()}*/}
                    {this.props.children}
                </div>
                <Sidebar/>
            </div>
        )
    }
}
export default Layout