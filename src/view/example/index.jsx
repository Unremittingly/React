import React, {Component} from 'react'
import Layout from '../../common/layout'
import Snake from './snake'
import FireWork from './fireWorks'
import Pdf from './pdf'
import Item from './template/item'
import EchartsMap from "./echartsMap";

class Example extends Component {
    state = {
        list: [
            {
                name: '贪吃蛇',
                gitUrl: 'https://github.com/Unremittingly/web/tree/master/canvas/snake',
                component: <Snake/>,
                url: '/example/snake'
            },
            {
                name: '火花',
                gitUrl: 'https://github.com/Unremittingly/web/tree/master/canvas/fireworks',
                component: <FireWork/>,
                url: '/example/fireWork'
            },
            {
                name: '打印pdf',
                gitUrl: 'https://github.com/Unremittingly/web/tree/master/canvas/fireworks',
                component: <Pdf/>,
                url: '/example/pdf'
            },
            {
                name: '地图',
                // gitUrl: 'https://github.com/Unremittingly/web/tree/master/canvas/fireworks',
                component: <EchartsMap/>,
                url: '/example/echartsMap'
            }
        ]
    };

    render() {
        let {list} = this.state;
        return (
            <div className="example">
                <Layout>
                    {list.map((item) => {
                        return <Item key={item.name} name={item.name} gitUrl={item.gitUrl} url={item.url}>{item.component}</Item>;
                    })}
                </Layout>

            </div>
        )
    }
}

export default Example
