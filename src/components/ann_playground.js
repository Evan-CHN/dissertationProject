import React, {useContext, useEffect, useRef, useState} from 'react'
import {Button, Divider, Select, Spin} from "antd";
import axios from 'axios'
import {ModelTypeContext} from "./ann_model_detail";

const {Option} = Select;
var echarts = require('echarts');

function ANNPlayGround() {
    const historyChartRef = useRef()
    const modelType = useContext(ModelTypeContext)
    const optimizers = ['SGD', 'RMSprop', 'Adam']
    const batchSize = [100, 200, 400, 800, 1000]
    const epoch = [1, 5, 10, 15, 20]
    const [trainingStauts, setTrainingStatus] = useState(false)
    const [selectedBatchSize, setBatchSize] = useState(batchSize[1]);
    const [selectedEpoch, setEpoch] = useState(epoch[1]);
    const [selectedOptimizer, setOptimizer] = useState(optimizers[2])
    const [chartOptions, setchartOptions] = useState({
        title: {
            text: 'Model Training History',
            right: 'center',
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['loss', 'auc', 'val_loss', 'val_auc'],
            y: 'bottom',
        },

        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'loss',
                type: 'line',
                data: []
            },
            {
                name: 'auc',
                type: 'line',
                data: []
            },
            {
                name: 'val_loss',
                type: 'line',
                data: []
            },
            {
                name: 'val_auc',
                type: 'line',
                data: []
            },
        ]
    })
    let myChart = null

    function renderChart() {
        const historychart = echarts.getInstanceByDom(historyChartRef.current)
        if (historychart) {
            myChart = historychart
        } else {
            myChart = echarts.init(historyChartRef.current)
        }
        myChart.setOption(chartOptions)
    }

    useEffect(() => {
        renderChart()
    })
    return (
        <>
            <h2>
                Model Adjustment
            </h2>
            <span>Optimizer: <Select
                id='selected_optimizer'
                value={selectedOptimizer}
                onChange={(value => setOptimizer(optimizers[value]))}>
                {
                    optimizers.map((ele, index) => {
                        return (
                            <Option key={index}>{ele}</Option>
                        )
                    })
                }
            </Select></span>
            <Divider type={'vertical'}/>
            <span>
                Batch size: <Select
                id='selected_batch_size'
                value={selectedBatchSize}
                onChange={(value => setBatchSize(batchSize[value])
                )}>
                    {
                        batchSize.map((ele, index) => {
                            return (
                                <Option key={index}>{ele}</Option>
                            )
                        })
                    }
                </Select>
            </span>
            <Divider type={'vertical'}/>
            <span>
                Epoch: <Select
                id='selected_epoch'
                value={selectedEpoch}
                onChange={(value => setEpoch(epoch[value])
                )}>
                    {
                        epoch.map((ele, index) => {
                            return (
                                <Option key={index}>{ele}</Option>
                            )
                        })
                    }
                </Select>
            </span>
            <Divider type={'vertical'}/>
            <Button type={'primary'} onClick={() => {
                setTrainingStatus(true)
                axios.post('http://127.0.0.1:5000/play_ann_model', {
                    batch_size: selectedBatchSize,
                    epoch: selectedEpoch,
                    optimizer: selectedOptimizer,
                    model_type: modelType
                }).then(response => {
                    console.log(response)
                    let epoch_number = Number(response.data['epoch'])
                    var arr1 = new Array(epoch_number);
                    for (var i = 0; i < arr1.length; i++) {
                        arr1[i] = i;
                    }
                    let tempOptions = Object.assign({}, chartOptions,
                        {
                            series: [
                                {
                                    name: 'loss',
                                    type: 'line',
                                    data: response.data['train_loss']
                                },
                                {
                                    name: 'auc',
                                    type: 'line',
                                    data: response.data['train_acc']
                                },
                                {
                                    name: 'val_loss',
                                    type: 'line',
                                    data: response.data['val_loss']
                                },
                                {
                                    name: 'val_auc',
                                    type: 'line',
                                    data: response.data['val_acc']
                                },
                            ]
                        }, {
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                data: arr1
                            }
                        }
                    )
                    setchartOptions(tempOptions)
                    setTrainingStatus(false)
                }).catch(error => {
                    console.log(error)
                })
            }}>Submit</Button>
            <Spin tip={'training...'} spinning={trainingStauts}>
                <div style={{width: "400px", height: "400px", marginTop: 50}} ref={historyChartRef}/>
            </Spin>

        </>
    )
}

export default ANNPlayGround