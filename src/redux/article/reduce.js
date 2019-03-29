import {GET_LIST, EDIT_ARTICLE, DELETE_ARTICLE} from "./constant";

import {createReduce} from "../tool";

// const operationReduce = (state, action) => {
//     // console.log('state',action);
//     let res = action.data?action.data.data:[];
//     switch (action.type) {
//         case GET_LIST:
//             return {...state, data: res.data, type: GET_LIST, state: res.state};
//         case DELETE_ARTICLE:
//             return {...state, type: DELETE_ARTICLE, state: res.state};
//         case EDIT_ARTICLE:
//             return {...state, type: EDIT_ARTICLE, state: res.state};
//         default:
//             return {...state,data:res.data?res.data:[]}
//     }
//
// };


const operationReduce = createReduce({},()=>{
    return {
        'GET_LIST':(state,action)=>{
            let res = action.data?action.data.data:[];
            return {...state, data: res.data, type: GET_LIST, state: res.state};
        },
        'EDIT_ARTICLE':(state,action)=>{
            let res = action.data?action.data.data:[];
            return {...state, type: EDIT_ARTICLE, state: res.state};
        },
        'DELETE_ARTICLE':(state,action)=>{
            let res = action.data?action.data.data:[];
            return {...state, type: DELETE_ARTICLE, state: res.state};
        }
    }
});

export default operationReduce
