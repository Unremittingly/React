import React, {Component} from 'react'
import Layout from '../../common/layout'
import {Button} from "antd";
import {add, minus} from "../../redux/test/action";
import {connect} from "react-redux";
import mapDispatchToProps from "react-redux/es/connect/mapDispatchToProps";

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
    dispatch(type){
        const store = this.props;
        if(type==1){
            store.dispatch(add())
        }else{
            store.dispatch(minus())
        }

    }

    render() {


        return (
            <div>
                <Layout {...this.state} >
                    <div>total:{}</div>
                    <Button type="primary" htmlType="button" onClick={()=>this.dispatch(1)}>add</Button>
                    <Button  type="primary" htmlType="button" onClick={()=>this.dispatch(2)}>minus</Button>
                </Layout>
            </div>
        );
    }
}

export default connect(state => ({
    navList: state.common,
    state
}))(Test);
