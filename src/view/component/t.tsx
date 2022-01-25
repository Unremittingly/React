import * as React from "react";

interface IProps{
    price:string,
    name:string
}
const Rfc: React.FC<IProps> = (props)=>{
    const {price, name = 'rfc测试' }= props;
    return <div>{name}</div>
}
export  default Rfc;