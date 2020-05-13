import React from 'react'
import './index..scss'
const Record = ()=>{
    return (
        <div>
            我的履历：

            <div className="record-item">
                <span className="record-label">git地址：</span>
                <span className="record-con"><a  rel="noopener noreferrer" href="https://github.com/Unremittingly" target="_blank">https://github.com/Unremittingly/React</a></span>
            </div>
            <div className="record-item">
                <span className="record-label">CSDN博客地址：</span>
                <span className="record-con"><a  rel="noopener noreferrer" href="https://blog.csdn.net/wangshang1320" target="_blank">https://blog.csdn.net/wangshang1320</a></span>
            </div>
        </div>
    );
};
export default Record;
