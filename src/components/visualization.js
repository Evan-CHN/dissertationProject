import React, {useContext, useEffect, useRef, useState} from 'react';
import {Context, PointContext} from "./root";
import {Button, Col, Row, Select, Space} from "antd";
import axios from 'axios'
import PointDetail from '../components/point_detail'

const {Option} = Select
var echarts = require('echarts');

function Visualization() {
    const context = useContext(Context)
    const pointContext = useContext(PointContext)
    const AppContext = useContext(Context);
    const chartRef = useRef()
    let myChart = null
    const vectorizationMethods = ['TF-IDF', 'Word2Vec', 'Doc2Vec'];
    const decompositionMethods = ['PCA', 'UMAP'];
    const [selected_vectorization_method, setVecsMethod] = useState(vectorizationMethods[0]);
    const [selected_decomposition_method, setDecomposMethods] = useState(decompositionMethods[0]);

    function renderChart() {
        const chart = echarts.getInstanceByDom(chartRef.current)
        if (chart) {
            myChart = chart

        } else {
            myChart = echarts.init(chartRef.current)
        }
        myChart.setOption(context.state)
        myChart.on('click', function (params) {
            console.log(document.getElementById('value_selected_method').value)
            axios.post('http://localhost:5000/get_vec_detail', {
                vec_id: params['dataIndex'],
                vec_sentiment: params['seriesName'],
                decomposition_method: selected_decomposition_method,
                vectorized_method: selected_vectorization_method
            }).then(response => {
                pointContext.point_dispatch({
                    type: 'CHANGE',
                    payload: {
                        data: {
                            sentiment: response.data['sentiment'],
                            processed_review: response.data['processed_review'],
                            original_review: response.data['original_review'],

                        }
                    }

                })
            }).catch(error => {
                console.log(error)
            })
        })
    }

    useEffect(() => {
        renderChart()
    })
    return (
        <>
            <div className={"ControlButtons"} style={{marginLeft: "300px"}}>
                <Space>
                    <Select
                        id='value_selected_method'
                        value={selected_vectorization_method}
                        onChange={(value => setVecsMethod(vectorizationMethods[value]))}>
                        {
                            vectorizationMethods.map((ele, index) => {
                                return (
                                    <Option key={index}>{ele}</Option>
                                )
                            })
                        }
                    </Select>
                    <Select
                        id='value_selected_decomposition_method'
                        value={selected_decomposition_method}
                        onChange={(value => setDecomposMethods(decompositionMethods[value])
                        )}>
                        {
                            decompositionMethods.map((ele, index) => {
                                return (
                                    <Option key={index}>{ele}</Option>
                                )
                            })
                        }
                    </Select>
                    <Button type="primary" onClick={() => {
                        axios.post("http://localhost:5000/get_vecs", {
                            vecs_method: selected_vectorization_method,
                            decomposition_method: selected_decomposition_method
                        }).then(response => {
                            AppContext.dispatch({
                                type: 'CHANGE',
                                payload: {
                                    data: {
                                        neg_points: response.data['negative'],
                                        pos_points: response.data['positive']
                                    }
                                }
                            })
                        }).catch(error => {
                            console.log(error)
                        })

                    }}>Run</Button>
                </Space>
            </div>
            <div align="center" className={"Visualization"}>
                <Row>
                    <Col span={12}>
                        <div style={{width: "600px", height: "600px"}} ref={chartRef}/>
                    </Col>
                    <Col span={12}>
                        <PointDetail/>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Visualization