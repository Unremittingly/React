import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'

import userInfo from './userInfo/reduce';
import common from './nav/reduce';
import article from './article/reduce'

import test from  './test/reduce';
import {persistReducer ,persistStore} from 'redux-persist';
import storageSession from "redux-persist/es/storage/session";
// const { composeWithDevTools } = require('redux-devtools-extension');


// import storage from 'redux-persist/es/storage'

// const storageConfig = {
//     key: 'root', // 必须有的
//     storage, // storage is now required
//     blacklist: [] // reducer 里不持久化的数据
// };



const userConfig = {
    key: 'userInfo',
    storage: storageSession,
};

const rootReduce = combineReducers({
    userInfo:persistReducer(userConfig,userInfo),
    common,
    test,
    article
});

// const store = createStore(rootReduce,composeWithDevTools());
export const store = createStore(rootReduce,applyMiddleware(thunk));
export const persistor = persistStore(store);

