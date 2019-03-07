import {createStore} from 'redux';



import Home from '../view/home'



//这是一个方法
const operation = (state = 10, action) => {
    console.log('state', state, action);
    if (action.type == 'ADD') {
        return ++state;
    } else {
        return --state;
    }
};



const navList = ()=>{
  let list = [];

  list.push({
      name:'首页',
      path:'/',
      component:Home,
  });


  return list;
};


const store = createStore(navList);




export default store;