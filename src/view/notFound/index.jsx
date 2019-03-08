import React,{Component} from 'react'
import Layout from '../../common/layout'

class NotFound extends Component{

    state = {
      name:'404'
    };

    render() {
        return (
            <div>
                <Layout {...this.state.name} />
                <div className='contain'>404 not found</div>
            </div>
        );
    }
}

export default NotFound;