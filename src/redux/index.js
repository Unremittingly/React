import {createStore,combineReducers} from 'redux';

import userInfo from './userInfo/reduce';
import common from './common/reduce';
import login from './login/reduce';





//这是一个方法
const operation = (state = 10, action) => {
    console.log('state', state, action);
    if (action.type == 'ADD') {
        return ++state;
    } else {
        return --state;
    }
};




const rootReduce = combineReducers({
    userInfo,
    login,
    common,

});

const store = createStore(rootReduce);




export default store;