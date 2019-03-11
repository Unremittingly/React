import React,{Component} from 'react'
import Layout from '../../common/layout'
class Application extends Component{

    state = {
        title:'个人中心',
        code:2
    };
    render() {
        return (
            <div>
                <Layout {...this.state}>个人中心</Layout>

            </div>
        )
    }
}

export default Application;

