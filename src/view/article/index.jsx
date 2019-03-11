import React,{Component} from 'react';
import Layout from '../../common/layout'

class Article extends Component{
    state = {
        name: '404',
        code: 3
    };
    render() {
        return (
            <div>
                <Layout {...this.state}  >文章</Layout>

            </div>
        )
    }
}

export default Article