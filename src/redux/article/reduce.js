import {GET_LIST, EDIT_ARTICLE, DELETE_ARTICLE} from "./constant";

const operationReduce = (state, action) => {
    // console.log('state',action);
    let res = action.data;
    switch (action.type) {
        case GET_LIST:
            return {...state, data: res.data, type: GET_LIST, state: res.state};
        case DELETE_ARTICLE:
            return {...state, type: DELETE_ARTICLE, state: res.state};
        case EDIT_ARTICLE:
            return {...state, type: EDIT_ARTICLE, state: res.state};
        default:
            return {...state,data:'default'}
    }

};
export default operationReduce
