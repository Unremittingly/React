import React, {Component} from 'react'
import Layout from '../../common/layout'
import {Button} from "antd";
import {add, minus} from "../../redux/test/action";
import {connect} from "react-redux";



/*******
 * 测试（学习）redux的dispatch分发任务给reduce 然后改变store值
 */

class Test extends Component {

    state = {
        name: '404',
        code: 0
    };


    render() {

        return (
            <div>
                <Layout {...this.state} >
                    <div>total:{parseInt(this.props.count)}</div>
                    <Button type="primary" htmlType="button" onClick={() => this.props.add()}>add</Button>
                    <Button type="primary" htmlType="button" onClick={() => this.props.minus()}>minus</Button>
                </Layout>
            </div>
        );
    }
}

//映射state状态到组件
const mapStateToProps = (state)=>{
    return {
        count:state.test
    }
};
//映射dispatch分发函数到组件
const mapDispatchToProps = (dispatch) => {
    return {
        add: () => {
            dispatch(add());
        },
        minus: () => {
            dispatch(minus());
        },
    }
};

export default connect( mapStateToProps,mapDispatchToProps)(Test);
