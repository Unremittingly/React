import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './common/style/variate..scss'
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux'
import {store,persistor} from './redux'
import {PersistGate} from 'redux-persist/es/integration/react'
function render(){
    return ReactDOM.render(<Provider store={store}><PersistGate persistor={persistor}><App/></PersistGate></Provider>, document.getElementById('root'));
}
render();
store.subscribe(render);//添加侦察器  能够在状态发生变化的时候让他自动响应
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


