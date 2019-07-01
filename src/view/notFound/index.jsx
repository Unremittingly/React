import React, {Component} from 'react'
import Layout from '../../common/layout'
import './index.scss'

class NotFound extends Component {

    state = {
        name: '404',
        code: 0
    };

    render() {
        let state = this.state;
        return (
            <div>
                <Layout {...state} >
                    <div className="fail">404 not found</div>
                </Layout>
            </div>
        );
    }
}

export default NotFound;