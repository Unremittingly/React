import React, {Component} from 'react'
import {startA, init} from './firework'
import {Button} from "antd";
import Layout from "../../../common/layout";

class FireWork extends Component {
    componentDidMount() {
        init();
    }

    render() {
        return (
            <div>
                <Layout>
                <canvas id="firework" width="800" height="500"/>
                <div className="optGroup">
                    <Button htmlType="button" onClick={() => {
                        startA()
                    }}>开始放烟花</Button>
                </div>
                </Layout>
            </div>
        );
    }
}


export default FireWork;
