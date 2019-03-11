import React, {Component} from 'react'
import Layout from '../../common/layout'

class NotFound extends Component {

    state = {
        name: '404',
        code: 0
    };

    render() {
        return (
            <div>
                <Layout {...this.state} >404 not found</Layout>
            </div>
        );
    }
}

export default NotFound;