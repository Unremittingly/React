import {createStore,combineReducers} from 'redux';

import userInfo from './userInfo/reduce';
import common from './common/reduce';
import login from './login/reduce';

import test from  './test/reduce';
const { composeWithDevTools } = require('redux-devtools-extension');

const rootReduce = combineReducers({
    userInfo,
    login,
    common,
    test
});

const store = createStore(rootReduce,composeWithDevTools());

export default store;
