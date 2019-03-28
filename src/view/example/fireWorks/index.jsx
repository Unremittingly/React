import React, {Component} from 'react'
import {startA, init} from './firework'
import {Button} from "antd";

class FireWork extends Component {
    componentDidMount() {
        init();
    }

    render() {
        return (
            <div>
                <canvas id="firework" width="800" height="500"/>
                <div className="optGroup">
                    <Button htmlType="button" onClick={() => {
                        startA()
                    }}>开始放烟花</Button>
                </div>
            </div>
        );
    }
}


export default FireWork;
