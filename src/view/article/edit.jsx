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
        title: '',
        content: '',
        type: 1,
        time: '1970-01-01'
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
        let editor = new E('#editorElem');
        let uploadUrl = 'http://localhost:3009/uploadImg';


        editor.customConfig.onchange = (html) => {
            console.log('111');
            this.editorContent = html;
            console.log('html11',html);
        };


//配置menus可以选择显示哪些菜单栏
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

        editor.customConfig.showLinkImg = false;
        editor.customConfig = {
            debug: true,//开启debug调试
            uploadImgServer: uploadUrl,//配置上传图片的接口api
            uploadImgMaxSize: 5 * 1024 * 1024,//图片大小限制为 5M
            uploadImgMaxLength: 10,// 限制一次最多上传 10 张图片
            uploadFileName: 'fileName',//配置文件参数名（这个参数必需配置，后台用这个值接收图片）
            showLinkImg:false  //隐藏网络图片tab
        };


//监听函数在上传图片的不同阶段做相应处理
        editor.customConfig.uploadImgHooks = {
            success: function (xhr, editor, result) {
                console.log('图片上传并返回结果,图片插入成功')
            },
            fail: function (xhr, editor, result) {
                console.log('图片上传并返回结果，但图片插入错误')
            },
            error: function (xhr, editor) {
                console.log('图片上传出错')
            },
            timeout: function (xhr, editor) {
                console.log('图片上传超时')
            },
            customInsert: function (insertImg, result, editor) {
                console.log(' 图片上传并返回结果');
                let url = result.url[0];
                insertImg(url)
            }
        };

        editor.create();

        this.editor = editor;

    }

    selectHandle(value) {
        console.log('vule', value);
        this.setState({
            type: value
        })
    }

    submitHandle() {
        // console.log('json', this.editor.txt.getJSON());
        // console.log('test', this.editor.txt.text());
        let content = this.editor.txt.html();
        let desc = this.editor.txt.text();

        //todo  需要处理特殊字符转义问题
        let data = {
            content: content.replace(/\"/g, '\\"'),//转义一下双引号 以方便存入数据库
            title: this.titleInput.state.value,
            type: this.state.type,
            time: parseInt((new Date().getTime()) / 1000),
            desc
        };

        saveArticle('http://localhost:3009/saveArticle', data);

    }

    tabChange() {

    }

    render() {
        return (
            <Layout>
                <div className="article-edit">
                    <Tabs defaultActiveKey="1" style={{height: '100%'}} onChange={this.tabChange}>
                        <TabPane tab="富文本编辑器" key="1">
                            <Input ref={input => this.titleInput = input} placeholder="标题"/>
                            <div id="editorElem" ref='editorElem' style={{textAlign: 'left'}}/>
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
                        <Option value="3">数据库</Option>
                    </Select>
                </div>
                <Button className="submit-btn" htmlType="button" type="primary" onClick={this.submitHandle}>提交</Button>
            </Layout>
        )
    }
}


export default Edit
