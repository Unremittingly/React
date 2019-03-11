import {createStore,combineReducers} from 'redux';

import userInfo from './userInfo/reduce';
import common from './common/reduce';
import login from './login/reduce';


const rootReduce = combineReducers({
    userInfo,
    login,
    common,

});

const store = createStore(rootReduce);

export default store;