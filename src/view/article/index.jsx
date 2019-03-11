import React,{Component} from 'react';
import Layout from '../../common/layout'
import './index..scss'

class Article extends Component{
    state = {
        name: '404',
        code: 3
    };
    render() {
        return (
            <div>
                <Layout {...this.state}  >
                    <div className='article'>
                        <div className='title'>
                            <span className='text'>标题</span>
                            <span className='time'>2018/10/12</span>
                            <span className='tag'>标签</span>
                        </div>
                        <div className='content'>内容</div>
                    </div>
                </Layout>

            </div>
        )
    }
}

export default Article