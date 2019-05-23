import React, {Component} from 'react'
import Layout from '../../common/layout'

import Tags from './tag';

import Record from './record'

import './index..scss'


class UserInfo extends Component {

    state = {
        title: '个人中心',
        code: 2
    };

    render() {
        return (
            <div>
                <Layout {...this.state}>个人中心
                    <Tags/>
                    <Record/>
                </Layout>
            </div>
        )
    }
}

export default UserInfo;

