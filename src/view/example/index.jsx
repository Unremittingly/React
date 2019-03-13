import React,{Component} from 'react'
import Layout from '../../common/layout'
import Snake from './snake'
import Item from './template/item'

class  Example extends Component{
    state =[
        {
            name:'snake',
            gitUrl:'https://github.com/Unremittingly/web/tree/master/canvas/snake',
            component:<Snake/>
        }
    ];
    render() {
        return (
            <div className="example">
                <Layout>
                    {this.state.map((item)=>{
                        return <Item name={item.name} gitUrl={item.gitUrl}>{item.component}</Item>;
                    })}

                </Layout>

            </div>
        )
    }
}

export default Example
