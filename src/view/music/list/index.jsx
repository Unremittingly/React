import React from 'react';
import './index.scss';
import { Spin, Icon } from 'antd';
import { getUrl } from '../../../helpers/dataManage';

const MusicList = (props)=>{

    const {data} = props;
    const {songs,isLoading} = data;

    const getSongUrl= ()=>{
      const url = 'http://api.mtnhao.com/song/url';
        getUrl(url,{
            id:33894312
        }).then((data)=>{
            console.log('data');
        })
    };

    if(isLoading){
        return <div className="music-list"><Spin /></div>;
    }
    return (<div className="music-list">
        {

            songs  ? songs.map((item,index)=>{
                return <div key={index} className="song-item">
                    <div className="song-name">{item.name}</div>
                    <div className="song-artists">
                        {item.artists && item.artists.map((artist)=>{
                            return (<span className="artist-item">{artist.name}</span>)
                        })}
                    </div>
                    <div className="optGroup"> <a href="http://m8.music.126.net/20200117175416/a33d2b2c18f50df71409fcec2d1ca164/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3" download="t.mp3">down</a><Icon type="download"/> </div>

                </div>
            }) :<div>
                暂无数据
            </div>
        }

    </div>)
};


export default MusicList;
