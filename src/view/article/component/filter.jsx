import React, {Component} from 'react'
import {Input, DatePicker, Select} from "antd";
import './index..scss';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
const Option = Select.Option;


class Filter extends Component {

    state = {
        time: '2016-11-01',
        dateType: 'YYYY-MM-DD',
        str: 'test',
        type: 1
    };

    dataChange(e, dataString) {
        // dataString就是选中的值     http://design.alipay.com网站上有 另外一个ant.design网站没找到

        this.setState({
            time: dataString
        });

    }


    render() {
        return (
            <div className="filter">
                <span className="filter-time"><DatePicker
                    defaultValue={moment(this.state.time, this.state.dateType)}
                    onChange={this.dataChange.bind(this)}/></span>
                <span className="filter-type">文章类型</span>
                <span className="filter-type">
                    <Select defaultValue="lucy">
                    <Option value="lucy">文章类型1</Option>
                    <Option value="lucy1">文章类型</Option>
                    </Select>
                </span>
                <span className="filter-search"><Input.Search size="default" defaultValue={this.state.str} placeholder="请输入搜索内容" enterButton="search"/></span>
            </div>
        )
    }
}

export default Filter
