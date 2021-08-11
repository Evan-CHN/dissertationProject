import React, {createContext, useState} from 'react'
import {Col, Image, Row, Table, Tabs} from "antd";
import mlp_png from '../resources/MLP.png'
import cnn_png from '../resources/CNN.png'
import lstm_png from '../resources/LSTM.png'
import rnn_png from '../resources/RNN.png'
import ANNPlayground from '../components/ann_playground'

const {TabPane} = Tabs;
export const ModelTypeContext = createContext(null)

function ANNModelDetail() {

    const mlp_dataSource = [
        {
            train_auc: 0.9072,
            train_loss: 0.0724,
            validation_auc: 0.9097,
            validation_loss: 0.5247,
            batch_size: 200,
            epoch: 20
        },

    ]
    const cnn_dataSource = [
        {
            train_auc: 0.9392,
            train_loss: 0.0262,
            validation_auc: 0.9408,
            validation_loss: 0.5243,
            batch_size: 200,
            epoch: 20
        },

    ]
    const rnn_dataSource = [
        {
            train_auc: 0.8828,
            train_loss: 0.2860,
            validation_auc: 0.8839,
            validation_loss: 0.5445,
            batch_size: 200,
            epoch: 20
        },

    ]
    const lstm_dataSource = [
        {
            train_auc: 0.9313,
            train_loss: 0.1296,
            validation_auc: 0.9322,
            validation_loss: 0.5785,
            batch_size: 200,
            epoch: 20
        },

    ]
    const columns = [
        {
            title: 'Train AUC',
            dataIndex: 'train_auc',
            key: 'train_auc',
        },
        {
            title: 'Train Loss',
            dataIndex: 'train_loss',
            key: 'train_loss',
        },
        {
            title: 'Validation AUC',
            dataIndex: 'validation_auc',
            key: 'validation_auc',
        },
        {
            title: 'Validation Loss',
            dataIndex: 'validation_loss',
            key: 'validation_loss',
        },
        {
            title: 'Batch Size',
            dataIndex: 'batch_size',
            key: 'batch_size',
        },
        {
            title: 'Epoch',
            dataIndex: 'epoch',
            key: 'epoch',
        },
    ]
    const keysList = ['MLP,CNN,LSTM,RNN']
    const [tabPaneKey, setTabPaneKey] = useState(keysList[0])
    return (
        <ModelTypeContext.Provider value={tabPaneKey}>
            <div className={"ModelDetails"}>
                <Tabs activeKey={tabPaneKey} onChange={(curKey => setTabPaneKey(curKey)
                )}
                >
                    <TabPane tab="MLP" key="MLP">
                        <h2>Information of Trained MLP Model</h2>
                        <Row>
                            <Col span={12}>
                                <Table dataSource={mlp_dataSource} columns={columns} pagination={false}
                                       style={{width: 500}}/>
                                <Image src={mlp_png} height={600}/>
                            </Col>
                            <Col span={12}>
                                <ANNPlayground modelType={tabPaneKey}/>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="CNN" key="CNN">
                        <h2>Information of Trained CNN Model</h2>
                        <Row>
                            <Col span={12}>
                                <Table dataSource={cnn_dataSource} columns={columns} pagination={false}
                                       style={{width: 500}}/>
                                <Image src={cnn_png} height={600}/>
                            </Col>
                            <Col span={12}>
                                <ANNPlayground modelType={tabPaneKey}/>
                            </Col>
                        </Row>

                    </TabPane>
                    <TabPane tab="LSTM" key="LSTM">
                        <h2>Information of Trained LSTM Model</h2>
                        <Row>
                            <Col span={12}>
                                <Table dataSource={lstm_dataSource} columns={columns} pagination={false}
                                       style={{width: 500}}/>
                                <Image src={lstm_png} height={600}/>
                            </Col>
                            <Col span={12}>
                                <ANNPlayground modelType={tabPaneKey}/>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="RNN" key="RNN">
                        <h2>Information of Trained RNN Model</h2>
                        <Row>
                            <Col span={12}>
                                <Table dataSource={rnn_dataSource} columns={columns} pagination={false}
                                       style={{width: 500}}/>
                                <Image src={rnn_png} height={600}/>
                            </Col>
                            <Col span={12}>
                                <ANNPlayground modelType={tabPaneKey}/>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </div>
        </ModelTypeContext.Provider>

    )
}

export default ANNModelDetail;