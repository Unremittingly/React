import React, {useEffect} from 'react';
import * as echarts from 'echarts/core';
import { TitleComponent, TooltipComponent, GeoComponent, GridComponent, LegendComponent } from 'echarts/components';
import { ScatterChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { EffectScatterChart } from 'echarts/charts';
import { LinesChart } from 'echarts/charts';
import chinaMapJson from './china.json';
import  './index.scss';
import Layout from "../../../common/layout";

echarts.use([
    TitleComponent,
    TooltipComponent,
    GeoComponent,
    GridComponent,
    LegendComponent,
    ScatterChart,
    CanvasRenderer,
    EffectScatterChart,
    LinesChart,
]);
const EchartsMap = () => {

    useEffect(() => {

        const echartsConDom = document.getElementById('echarts-map');
        const myChart = echarts.init(echartsConDom); // 初始化
        echarts.registerMap('china', chinaMapJson);

        const series = [];

        const option = {
            backgroundColor: '#fff',

            geo: {
                map: 'china', // 地图选择
                // silent: true, // 禁止图形响应鼠标事件
                itemStyle: {
                    color: '#FFE8E7', // 背景颜色
                    borderColor: '#F7A6A3', // 边框颜色
                },
                label: {
                    show: false,
                },
                layoutCenter: ['50%', '65%'],
                layoutSize: 600,
                // zoom: 1.5, // 当前视角的缩放比例
                roam: true, // 是否开启鼠标缩放和平移漫游
                scaleLimit: {min: 1.2, max: 2}, // 滚轮缩放的极限控制
                // 高亮状态下的多边形和标签样式
                emphasis: {
                    label: {
                        show: true,
                    },
                    itemStyle: {
                        color: '#F7A6A3',
                    },
                },
            },
            tooltip: {
                formatter: function (params) {
                    return `${params.name}`;
                },
            },
            series: series,
            // 图例
            legend: {
                show: false, // 不展示默认样式，使用事件切换图例展示
                selectedMode: 'single', // 设置单选多选模式
            },
        };
        myChart.setOption(option);

    }, [])

    return <div className="echarts-map">
        <Layout>
        <div id="echarts-map" style={{ width: '100%', height: '600px' }}>

        </div>
        </Layout>
    </div>
};

export default EchartsMap;