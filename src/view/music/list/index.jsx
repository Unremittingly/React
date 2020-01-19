import React from 'react';
import './index.scss';
import {Spin, Icon} from 'antd';
import axios from "axios";
import dayjs from 'dayjs';


const MusicList = (props) => {

    const {data} = props;
    const {songs, isLoading} = data;
    const getSongUrl = async (id) => {
        const url = 'http://api.mtnhao.com/song/url?id='+id;
        return axios.get(url);
    };

    const downloadMp3 = (filePath,saveName) => {
        fetch(filePath).then(res => res.blob()).then(blob => {
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.style.display = 'none';
            // 使用获取到的blob对象创建的url
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            // 指定下载的文件名
            a.download = saveName+'.mp3';
            a.click();
            document.body.removeChild(a);
            // 移除blob对象的url
            window.URL.revokeObjectURL(url);
        });
    };

    if (isLoading) {
        return <div className="music-list"><Spin/></div>;
    }
    return (<div className="music-list">
        {

            songs ? songs.map((item, index) => {
                return <div key={index} className="song-item">
                    <div className="song-name">{item.name}</div>
                    <div className="song-artists">
                        {item.artists && item.artists.map((artist,index) => {
                            return (<span key={index} className="artist-item">{artist.name}</span>)
                        })}
                    </div>
                    <div className="song-duration">{dayjs(item.duration).minute()}:{dayjs(item.duration).second()}</div>
                    <div className="optGroup">
                        <Icon type="download" onClick={()=>{
                            let artistStr = '';
                            item.artists && item.artists.forEach((artist) => {
                                artistStr += artist.name
                            });
                            getSongUrl(item.id).then((res)=>{
                                console.log('data',res);
                                if(res.status === 200){
                                    const src = res.data.data[0].url;
                                    console.log('src',src);
                                    downloadMp3(src,`${item.name} (${artistStr})`);
                                }
                            });
                        }
                        } /></div>

                </div>
            }) : <div>
                暂无数据
            </div>
        }

    </div>)
};


export default MusicList;
