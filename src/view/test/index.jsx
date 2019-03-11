import React, {Component} from 'react'
import Layout from '../../common/layout'
import {Button} from "antd";
import {add, minus} from "../../redux/test/action";
import {connect} from "react-redux";

/*******
 * 测试（学习）redux的dispatch分发任务给reduce 然后改变store值
 */
class Test extends Component {

    constructor(props) {
        super(props);

    }

    state = {
        name: '404',
        code: 0
    };

    render() {
        const store = this.props;
        let num = 100;
        console.log('store',store);

        return (
            <div>
                <Layout {...this.state} >
                    <div>total:{}</div>
                    <Button type='primary' htmlType='button' onClick={()=>store.dispatch(add())}>add</Button>
                    <Button  type='primary' htmlType='button' onClick={()=>store.dispatch(minus())}>minus</Button>
                </Layout>
            </div>
        );
    }
}

export default connect(state => ({
    navList: state.common,
    state
}))(Test);
