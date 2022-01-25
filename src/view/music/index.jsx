import React, {useState} from 'react';
import Layout from '../../common/layout'
import {Input} from 'antd';
import { getUrl } from '../../helpers/dataManage';
import  MusicList  from './list';



const { Search } = Input;
const Music = ()=>{


    const [musicData, setMusicData] = useState({
        songs:[],
    });

    const [isLoading, setIsLoading] = useState(false);

    const search = (value)=>{
        const url = 'http://api.mtnhao.com/search';
        setIsLoading(true);
        getUrl(url,{
            keywords: value,
            limit:10
        },true).then((res)=>{
          const data = {
              songs:res.result.songs
          };
          setMusicData(data);
        }).finally(()=>{
            setIsLoading(false);
        })
    };

    return (<div>
        <Layout>
            <Search
                placeholder="input search text"
                onSearch={value => search(value)}
                style={{ width: 200 }}
            />
            <MusicList isLoading={isLoading} data={musicData}/>
        </Layout>

    </div>)
};


export default Music;
