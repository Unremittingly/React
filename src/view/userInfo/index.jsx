import React from 'react'
import Layout from '../../common/layout'
import Tags from './tag';
import Record from './record'
import './index..scss'

const state = {
    title: '个人中心',
    code: 2
};
const UserInfo = ()=>{
    return (
        <div>
            <Layout {...state}>个人中心
                <Tags/>
                <Record/>
            </Layout>
        </div>
    )
};
export default UserInfo;


