import React, {useEffect, useState} from "react";
import {Button, InputNumber} from "antd";
import Layout from "@/common/layout";
import './index.scss';

export const DualColouredBall=()=>{
  const [balls, setBalls] = useState([]);
  const [len, setLen] = useState(1);
  useEffect(()=>{
    // startBall();
  },[])
  const getRedBall = ()=>{
    const balls = [];
    for (let i = 0; i < 6; i++) {
      const newBall =  Math.ceil(Math.random()*33);
      if(!balls.find(f=>f===newBall) && newBall){
        balls.push(newBall);
      }
    }
    //这里随机出来的可能少于6条 因为有可能生成undefined  所以加个递归
    return balls.length>=6 ? balls.sort((a,b)=>a-b) : getRedBall();
  }

  const getBlueBall = ()=>{
    return Math.ceil(Math.random()*16) ;
  }

  const startBall = ()=>{
    const newBalls = [];
    for (let i = 0; i < len; i++) {
      const blue = getBlueBall();
      const reds  = getRedBall();
      newBalls.push({reds,blue});
    }
    setBalls(newBalls);
  }

  return <div className="dual-ball">
    <Layout>
      <div className="form-input">
        <InputNumber onChange={(e)=>{
          setLen(e)
        }} placeholder="请输入"/>
        <Button onClick={startBall}>生成</Button>
      </div>
      {
        balls.map((ball)=>{
          const {reds, blue}= ball;
          return  <div className="dual-coloured-ball">
            {
              reds.map((red)=>{
                return <div className="ball-item red-ball">
                  {red}
                </div>
              })
            }
            <div className="ball-item blue-ball">
              {blue}
            </div>
          </div>
        })
      }
    </Layout>

  </div>
}

export default DualColouredBall;