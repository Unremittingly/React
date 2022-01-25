import React, {createRef, useState} from 'react';
import JsPDF from 'jspdf';
import html2Canvas from 'html2canvas';
import dayjs from 'dayjs';

import './index.scss';

//595px  a4纸宽度
const Pdf = () => {
    const pdfs = createRef();
    const handlePrint = (isPrint) => {
        let targetDom = pdfs.current;
        // 获取节点高度，后面为克隆节点设置高度。
        let height = targetDom.height;
        // 克隆节点，默认为false，不复制方法属性，为true是全部复制。
        let cloneDom = targetDom.cloneNode(true);
        // 设置克隆节点的css属性，因为之前的层级为0，我们只需要比被克隆的节点层级低即可。
        cloneDom.style.backgroundColor = 'red';
        cloneDom.style.position = 'absolute';
        cloneDom.style.top = '0';
        cloneDom.style.index = '-1';
        cloneDom.style.height = height;
        // 将克隆节点动态追加到body后面。
        document.getElementById('pdf-con').appendChild(cloneDom);
        // console.log(cloneDom);
        // 插件生成base64img图片。
        html2Canvas(cloneDom,
            {

                dpi: window.devicePixelRatio,
                useCORS: true,
                // 画布开始渲染的y坐标位置
                y: 0
            }).then(
            (canvas) => {
                console.log('canvas', canvas);
                let contentWidth = canvas.width;
                let contentHeight = canvas.height;
                // 一页pdf显示html页面生成的canvas高度;
                let pageHeight = contentWidth / 592.28 * 841.89;
                // 未生成pdf的html页面高度
                let leftHeight = contentHeight;
                // 页面偏移
                let position = 0;
                // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                let imgWidth = 595.28;
                let imgHeight = 595.28 / contentWidth * contentHeight;
                let pageData = canvas.toDataURL('image/jpeg', 1.0);
                let pdf = new JsPDF('', 'pt', 'a4');
                // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                // 当内容未超过pdf一页显示的范围，无需分页
                if (leftHeight < pageHeight) {
                    pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
                } else {
                    while (leftHeight > 0) {
                        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                        leftHeight -= pageHeight;
                        // 避免添加空白页
                        position -= 841.89;
                        if (leftHeight > 0) {
                            pdf.addPage();
                        }
                    }
                }
                let nowDate = dayjs(new Date()).format('YYYY-MM-DD');
                if (isPrint) {
                    pdf.autoPrint();
                    pdf.output('dataurlnewwindow');
                } else {
                    pdf.save('boarding-pass-' + nowDate + '.pdf');
                }
            }
        );
    };
    return (<div className="pdf">
        <div id="pdf-con" className="pdf-con">
            test
        </div>
        <div className="pdf-con" ref={pdfs} style={{width: '595px', position: 'fixed', top: '-4444px', left: '-4999px'}}>
            test
        </div>
        <div>
            <Button htmlType="" onClick={() => handlePrint(false)}>下载</Button>
            <Button htmlType="" onClick={() => handlePrint(true)}>打印</Button>
        </div>

    </div>)
};

export default Pdf;