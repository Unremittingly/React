import React from 'react'
import Layout from '../../common/layout'
import './index.scss'

const title = {
    name: '404',
    code: 0
};
const  NotFound =()=> {
    return (
        <div>
            <Layout {...title} >
                <div className="fail">404 not found</div>
            </Layout>
        </div>
    );
};

export default NotFound;