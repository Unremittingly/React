import React, {Component} from 'react'
import Layout from '../../common/layout'
import Snake from './snake'
import FireWork from './fireWorks'
import Item from './template/item'

class Example extends Component {
    state = {
        list: [
            {
                name: 'snake',
                gitUrl: 'https://github.com/Unremittingly/web/tree/master/canvas/snake',
                component: <Snake/>
            },
            {
                name:'firework',
                gitUrl:'https://github.com/Unremittingly/web/tree/master/canvas/fireworks',
                component:<FireWork/>
            }
        ]
    };

    render() {
        return (
            <div className="example">
                <Layout>
                    {this.state.list.map((item) => {
                        return <Item key={item.name} name={item.name} gitUrl={item.gitUrl}>{item.component}</Item>;
                    })}
                </Layout>

            </div>
        )
    }
}

export default Example
