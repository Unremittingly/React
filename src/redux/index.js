import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'

import userInfo from './userInfo/reduce';
import common from './nav/reduce';
import article from './article/reduce';
import newArticle from './newArticle/reduce';
import test from  './test/reduce';

import {persistReducer ,persistStore} from 'redux-persist';
import storageSession from "redux-persist/es/storage/session";



const userConfig = {
    key: 'userInfo',
    storage: storageSession,
};

const rootReduce = combineReducers({
    userInfo:persistReducer(userConfig,userInfo),
    common,
    test,
    article,
    newArticle
});

// const store = createStore(rootReduce,composeWithDevTools());
export const store = createStore(rootReduce,applyMiddleware(thunk));
export const persistor = persistStore(store);

