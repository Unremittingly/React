import React, {Component} from 'react'
import Layout from '../../common/layout'
import style from './index.module.scss'


class Home extends Component {
    state = {
        name: '首页',
        code: 1,
    };

    render() {
        console.log('style',style);
        let state = this.state;
        return (
            <div>
                <Layout {...state}>
                    <div className={style.home}>home <br/>use css module for Resolve scope conflicts</div>
                    <div className={style.test}>test</div>
                </Layout>

            </div>
        )
    }
}


export default Home;
