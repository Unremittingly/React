import React, {Component} from 'react'
import Layout from '../../common/layout'


class Home extends Component {

    state = {
        name: '首页',
        code: 1,
    };

    render() {
        return (
            <div>
                <Layout {...this.state}>home</Layout>
            </div>
        )
    }
}


export default Home;
