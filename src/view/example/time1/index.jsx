import React, {useEffect, useState} from 'react';

import './index.scss'
import Layout from "../../../common/layout";


const hs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

const Time1 = () => {


    const [allData, setData] = useState([]);
    const [allS, setAllS] = useState([]);
    const [curS, setCurS] = useState({
        start: null,
        end: null,
        value: null
    });
    const [cValues, setCvalues] = useState([]);
    const [curV, setCurV]= useState();


    useEffect(() => {
        let d = [];
        for (let i = 0; i < hs.length; i++) {
            const item = hs[i];
            d.push({
                className: 't-item item',
                value: item,
            })
        }
        setData(d);
    }, [])
    const onDown = (value) => {
        if (curS.start) {
            if (curS.end) {
                setAllS([...allS, curS]);
                setCurS({
                    start: null,
                    end: null,
                    value: null
                })
            } else {
                setCurS({
                    ...curS,
                    end: value,
                })
            }
        } else {
            setCurS({
                ...curS,
                start: value,
            })
        }

        console.log('value', curS);
    }

    const onUp = (value) => {
        // console.log('value', value);
    }

    console.log('cusr',cValues);
    const onHover = (value) => {
        const newData = [];


        console.log('value',value,curV);
        if(curV!==value){
            setCurV(value);
        }
        //如果开始了 并且没有结束  并且当前这个和上一个不一样
        if (curS.start && !curS.end && curV !== value) {
            for (var i = 0; i < allData.length; i++) {
                var item = allData[i];
                if (item.value === value) {
                    item.className = 's-item';
                } else {
                    item.className = 't-item';
                }
                newData.push(item);
            }

            const start = curS.start;
            const offsetN = Math.abs(start-value) ;
            // console.log('offsetN',offsetN,start);
            if(start<value){
                const newA = [];
                for (var i = 0; i < offsetN; i++) {
                   newA.push(start+i+1);
                }
                setCvalues(new Set([...cValues,...newA]))
            }else if(start>value){
                const newA = [];
                for (var i = 0; i < offsetN; i++) {
                    newA.push(start-i-1);
                }
                setCvalues(new Set([...cValues,...newA]))
                // console.log('new',newA);
            }
            
            // const newv = [
            //     ...cValues,
            //     value
            // ];
            // setCvalues(newv)
            // console.log('newData',newData);
            // setData(newData);
            // setCurV(value);
        }

        // console.log('1',value);
    }

    const onEnter = (value) => {
        console.log('fff', value);
    }


    return <div>
        <Layout>
            <div className="time">
                {
                    allData.map((h) => {

                        return <div className={h.className} onMouseEnter={() => onHover(h.value)} onMouseDown={() => onDown(h.value)} onMouseUp={() => onUp(h.value)}/>
                    })
                }
            </div>
        </Layout>
    </div>
}

export default Time1;
