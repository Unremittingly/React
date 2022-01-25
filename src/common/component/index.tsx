import {Modal} from 'antd';



const { info, success } = Modal;
let infoMsg: any = [];
const delMsgToInfoMsg = (msg: any) => {
    infoMsg = infoMsg.filter((item: any) => item !== msg);
};
export const showInfoModal = (msg: string | React.ReactNode, callback?: () => void) => {
    const infoObj: any = {
        title: '提示',
        content: msg,
        okText: '确定',
        onOk: () => {
            delMsgToInfoMsg(msg);
        },
        onCancel: () => {
            delMsgToInfoMsg(msg);
        },
    };
    if (callback) {
        infoObj.onOk = () => {
            callback();
            delMsgToInfoMsg(msg);
        };
        infoObj.icon = '';
    }
    if (!infoMsg.includes(msg)) {
        infoMsg.push(msg);
        info(infoObj);
    }
};