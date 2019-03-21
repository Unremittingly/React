
import {createReduce} from "../tool";

// const count = (state = 10, action) => {
//     if (action.type === 'ADD') {
//         state = ++state;
//     } else if (action.type === 'MINUS') {
//         state = --state;
//     }
//     return state;
// };
//键值对 object 代替switch case 写法   多写一个工具函数createReduce
const count = createReduce(10,{
    "ADD":(state,action)=>{
        return ++state;
    },
    "MINUS":(state,action)=>{
        return --state;
    }
});

export default count
