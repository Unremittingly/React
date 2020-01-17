import React from 'react';
import './index.scss';
import { Spin, Icon } from 'antd';


const MusicList = (props)=>{

    const {data} = props;
    const {songs,isLoading} = data;

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
                    <div className="optGroup"><Icon type="download"/> </div>

                </div>
            }) :<div>
                暂无数据
            </div>
        }

    </div>)
};


export default MusicList;
