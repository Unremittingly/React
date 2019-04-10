
export const types = [
    {
        key:'1',
        value:'前端'
    },
    {
        key:'2',
        value:'后端'
    },
    {
        key:'3',
        value:'数据库'
    }
];


export const getType = (type) => {
    console.log('key',type);
    let value = types[0].value;
    for (let i = 0; i < types.length; i++) {
        let typeElement = types[i];
        if(typeElement.key === type){
            value = typeElement.value;
            break;
        }
    }
    console.log('value',value);
    return value;
};
