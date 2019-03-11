
const count = (state=10,action)=>{
    if(action.type == 'add'){
        console.log('add',++state);
    }else if(action.type == 'minus'){
        console.log('minus',--state);
    }
    return state;
};

export default count