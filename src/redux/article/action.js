
import axios from 'axios'


export const getData = (username,password)=>{
  return dispatch =>{
      axios.post('./getArticle',{username, password},res=>{
          if(res.code == 200){
              dispatch();
          }else{
              
          }
      })
  }
};