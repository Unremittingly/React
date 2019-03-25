import React, {Component} from 'react'
import ReactMarkdown from 'react-markdown'
import {Input, Tabs, Button, Select} from "antd";
import Layout from "../../common/layout";
import './edit..scss';
import {saveArticle} from "../../helpers/dataManage";


import E from 'wangeditor'

const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Edit extends Component {

    constructor(props) {
        super(props);
        //推荐绑定事件函数写在构造方法里面
        this.tabChange = this.tabChange.bind(this);
        this.selectHandle = this.selectHandle.bind(this);
        this.submitHandle = this.submitHandle.bind(this);



    }

    state = {
        str: '## 标题 title   \n  文本内容',
        title:'',
        content:'',
        type:1,
        time:'1970-01-01'
    };

    textChange(e) {
        this.setState({
            str: e.target.value
        })
    }


    componentDidMount() {
        this.initEditor();
    }

    //富文本编辑器
    initEditor() {
        const elem = this.refs.editorElem;
        const editor = new E(elem);

        this.editor = editor;

        editor.customConfig.zIndex = 100;
        //上传图片的目录
        let uploadPicUrl = '/fileclient-management/api/uploadpic';
        editor.customConfig.uploadImgServer = uploadPicUrl;
        // 限制一次最多上传 1 张图片
        editor.customConfig.uploadImgMaxLength = 1;
        editor.customConfig.customUploadImg = function (files, insert) {
            // files 是 input 中选中的文件列表
            console.log(files);
            if (files[0]) {
                //时间戳
                const formData = new Date().getTime();
                formData.append('file', files[0], 'cover.jpg');
                fetch(uploadPicUrl, {
                    method: 'POST',
                    body: formData
                }).then((res) => {
                    return res.json();
                }).then((res) => {
                    const data = res.resultData;
                    if (data) {
                        // 上传代码返回结果之后，将图片插入到编辑器中
                        insert(data.resourceUrl);
                    } else {
                        console.log(data.msg);
                    }
                })
            } else {
                console.log('请上传图片');
            }
        };
        editor.customConfig.menus = [
            'head', // 标题
            'bold', // 粗体
            'fontSize', // 字号
            // 'fontName', // 字体
            'italic', // 斜体
            'underline', // 下划线
            'strikeThrough', // 删除线
            'foreColor', // 文字颜色
            // 'backColor', // 背景颜色
            'link', // 插入链接
            'list', // 列表
            'justify', // 对齐方式
            'quote', // 引用
            // 'emoticon', // 表情
            'image', // 插入图片
            // 'table', // 表格
            // 'video', // 插入视频
            // 'code', // 插入代码
            'undo', // 撤销
            'redo' // 重复
        ];
        editor.customConfig.lang = {
            '设置标题': 'Title',
            '字号': 'Size',
            '文字颜色': 'Color',
            '设置列表': 'List',
            '有序列表': '',
            '无序列表': '',
            '对齐方式': 'Align',
            '靠左': '',
            '居中': '',
            '靠右': '',
            '正文': 'p',
            '链接文字': 'link text',
            '链接': 'link',
            '上传图片': 'Upload',
            '网络图片': 'Web',
            '图片link': 'image url',
            '插入视频': 'Video',
            '格式如': 'format',
            '上传': 'Upload',
            '创建': 'init'
        };
        editor.create()
    }
    tabChange(key) {
        console.log('key', key);
    }
    selectHandle(value){
        console.log('vule',value);
        this.setState({
            type:value
        })
    }
    submitHandle(){
        console.log('json',this.editor.txt.getJSON());
        console.log('test',this.editor.txt.text());
        console.log('test',this.editor.txt.html());
        let content = this.editor.txt.html();
        let desc = this.editor.txt.text();

        let data = {
            content:content.replace(/\"/g,'\\"'),//转义一下双引号
            title:this.titleInput.state.value,
            type:this.state.type,
            time:parseInt((new Date().getTime())/1000),
            desc
        };

        saveArticle('http://localhost:3009/saveArticle',data);

    }
    render() {
        return (
            <Layout>
                <div className="article-edit">
                    <Tabs defaultActiveKey="1" style={{height: '100%'}} onChange={this.tabChange}>
                        <TabPane tab="富文本编辑器" key="1">
                            <Input ref={input => this.titleInput = input} placeholder="标题"/>
                            <div ref='editorElem' style={{textAlign: 'left'}}/>
                        </TabPane>
                        <TabPane tab="markDown编辑器" key="2">
                            <div className="markdown">
                                <div className="edit-left" style={{'marginTop': 10}}>
                                    <Input placeholder="标题"/>
                                    <Input.TextArea defaultValue={this.state.str} onChange={this.textChange.bind(this)}/>
                                </div>
                                <div className="edit-right"><ReactMarkdown source={this.state.str}/></div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
                <div className="optGroup">
                    <Select defaultValue="lucy" onSelect={this.selectHandle} value="1">
                        <Option value="1">前端</Option>
                        <Option value="2">后端</Option>
                    </Select>
                </div>
                <Button  className="submit-btn" htmlType="button" type="primary" onClick={this.submitHandle}>提交</Button>
            </Layout>
        )
    }
}


export default Edit
