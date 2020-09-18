import React, {useState} from 'react';
import Layout from '../../common/layout'
import {Input} from 'antd';
import { getUrl } from '../../helpers/dataManage';
import  MusicList  from './list';



const { Search } = Input;
const Music = ()=>{


    const [musicData, setMusicData] = useState({
        songs:[],
        isLoading:false
    });

    const search = (value)=>{
        const url = 'http://api.mtnhao.com/search';
        setMusicData({
            songs:[],
            isLoading:true
        });
        getUrl(url,{
            keywords: value,
            limit:10
        },true).then((res)=>{
          const data = {
              songs:res.result.songs,
              isLoading:false,
          };
          setMusicData(data);

        }).catch(()=>{
            setMusicData({
                isLoading:false
            })
        })
    };

    return (<div>
        <Layout>
            <Search
                placeholder="input search text"
                onSearch={value => search(value)}
                style={{ width: 200 }}
            />
            <MusicList data={musicData}/>
        </Layout>

    </div>)
};


export default Music;
