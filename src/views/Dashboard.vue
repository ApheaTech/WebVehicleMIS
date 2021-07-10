<template>
    <div id="app-workbench">
        <el-container>
            <el-header id="workbench-header" style="height: 160px">
                <h2>工作台</h2>
                <el-row>
                    <el-col :span="2">
                        <el-image
                            style="width: 100px; height: 100px"
                            src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png">
                        </el-image>
                    </el-col>
                    <el-col :span="7">
                        <el-row>
                            <p class="title">司旭，祝你开心每一天!</p>
                        </el-row>
                        <el-row>
                            <p class="content">某某技术部</p>
                        </el-row>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <el-row>
                    <el-col :span="6" :offset="0">
                        <div id="chart1" style="width: 400px;height:300px"></div>
                    </el-col>
                    <el-col :span="6">
                        <div id="chart2" style="width: 400px;height:300px"></div>
                    </el-col>
                    <el-col :span="6">
                        <div id="chart3" style="width: 400px;height:300px"></div>
                    </el-col>
                    <el-col :span="6">
                        <div id="chart4" style="width: 400px;height:300px"></div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="18">
                        <div id="chart5" style="width: 1200px;height:400px"></div>
                    </el-col>
                    <el-col :span="6"></el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: "Dashboard",

    data() {
        return {
            chart1: {},
            chart1Option: {
                title: {
                    // text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    showBackground: true,
                    data: [5, 20, 36, 10, 10, 20]
                }]
            },
            chart2: {},
            chart2Option: {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    smooth: true
                }]
            },
            chart3: {},
            chart3Option: {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    areaStyle: {}
                }]
            },
            chart4: {},
            chart4Option: {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    smooth: true
                }]
            },
            chart5: {},
            chart5Option: {
                dataset: [{
                    dimensions: ['name', 'age', 'profession', 'score', 'date'],
                    source: [
                        [' Hannah Krause ', 41, 'Engineer', 314, '2011-02-12'],
                        ['Zhao Qian ', 20, 'Teacher', 351, '2011-03-01'],
                        [' Jasmin Krause ', 52, 'Musician', 287, '2011-02-14'],
                        ['Li Lei', 37, 'Teacher', 219, '2011-02-18'],
                        [' Karle Neumann ', 25, 'Engineer', 253, '2011-04-02'],
                        [' Adrian Groß', 19, 'Teacher', null, '2011-01-16'],
                        ['Mia Neumann', 71, 'Engineer', 165, '2011-03-19'],
                        [' Böhm Fuchs', 36, 'Musician', 318, '2011-02-24'],
                        ['Han Meimei ', 67, 'Engineer', 366, '2011-03-12'],
                    ]
                }, {
                    transform: {
                        type: 'sort',
                        config: { dimension: 'score', order: 'desc' }
                    }
                }],
                xAxis: {
                    type: 'category',
                    axisLabel: { interval: 0, rotate: 30 },
                },
                yAxis: {},
                series: {
                    type: 'bar',
                    encode: { x: 'name', y: 'score' },
                    datasetIndex: 1
                }
            }
        }
    },

    mounted() {
        this.chart1 = echarts.init(document.getElementById('chart1'));
        this.chart2 = echarts.init(document.getElementById('chart2'));
        this.chart3 = echarts.init(document.getElementById('chart3'));
        this.chart4 = echarts.init(document.getElementById('chart4'));
        this.chart5 = echarts.init(document.getElementById('chart5'));
        this.drawLine()
    },

    created() {

    },

    methods: {
        drawLine() {
            this.chart1.setOption(this.chart1Option);
            this.chart2.setOption(this.chart2Option);
            this.chart3.setOption(this.chart3Option);
            this.chart4.setOption(this.chart4Option);
            this.chart5.setOption(this.chart5Option);
        }

    }
}
</script>

<style scoped>
#workbench-header {
    text-align: left;
    height: 260px;
}

#workbench-header > h2 {
    margin-top: 30px;
    margin-bottom: 30px;
}

#workbench-header .title {
    font-size: 25px;
    margin-top: 20px;
    margin-bottom: 10px;
}


</style>