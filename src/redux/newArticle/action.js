
export const update = (data)=>{
    console.log('data',data);
    return {type:'UPDATE',articleData:data}
};
