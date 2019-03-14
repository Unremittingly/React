import {createStore,combineReducers} from 'redux';

import userInfo from './userInfo/reduce';
import common from './common/reduce';
import login from './login/reduce';
import article from './article/reduce'

import test from  './test/reduce';
const { composeWithDevTools } = require('redux-devtools-extension');

const rootReduce = combineReducers({
    userInfo,
    login,
    common,
    test,
    article
});

const store = createStore(rootReduce,composeWithDevTools());

export default store;
