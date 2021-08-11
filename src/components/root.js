import Title from '../components/title'
import Visualization from '../components/visualization'
import {createContext, useReducer} from "react";
import {Collapse, Divider} from 'antd';
import ANNModelDetail from '../components/ann_model_detail'
import ExperimentIntroduction from '../components/experiment_introduction'
import CorpusDescription from '../components/corpus_description'
import {defaultOptions, optionReducer} from "../context/context";
import {defaultPointDetails, pointDetailsReducer} from "../context/point_detail_context";
import {
    defaultSentimentDistributionOptions,
    sentimentDistributionOptionsReducer
} from '../context/corpus_description/pie_context'
import {defaultReviewLengthStatOptions, ReviewLengthStatOptionsReducer} from '../context/corpus_description/bar_context'

const {Panel} = Collapse
export const Context = createContext(null)
export const PointContext = createContext(null)
export const PieContext = createContext(null)
export const BarContext = createContext(null)

function Root() {
    const [state, dispatch] = useReducer(optionReducer, defaultOptions)
    const [point_state, point_dispatch] = useReducer(pointDetailsReducer, defaultPointDetails);
    const [pie_state, pie_dispatch] = useReducer(sentimentDistributionOptionsReducer, defaultSentimentDistributionOptions);
    const [bar_state, bar_dispatch] = useReducer(ReviewLengthStatOptionsReducer, defaultReviewLengthStatOptions);
    return (

        <PointContext.Provider value={{point_state, point_dispatch}}>
            <PieContext.Provider value={{pie_state, pie_dispatch}}>
                <BarContext.Provider value={{bar_state, bar_dispatch}}>
                    <Context.Provider value={{state, dispatch}}>
                        <div className="Root">
                            <Title style={{fontSize: 'larger'}}/>
                            <ExperimentIntroduction style={{fontSize: 'larger'}}/>
                            <Divider/>
                            <Collapse
                                style={{width: "90%", margin: "auto", top: 0, left: 0, right: 0, bottom: 0}}>
                                <Panel key={0} header={"Corpus Description"} style={{fontSize: 'larger'}}>
                                    <CorpusDescription/>
                                </Panel>
                                <Panel key="1" header="Data Vectorization" style={{fontSize: 'larger'}}>
                                    <Visualization/>
                                </Panel>
                                <Panel key={2} header={"ANN Models"} style={{fontSize: 'larger'}}>
                                    <ANNModelDetail style={{fontSize: 'larger'}}/>
                                </Panel>
                            </Collapse>
                            <Divider/>
                        </div>
                    </Context.Provider>
                </BarContext.Provider>
            </PieContext.Provider>
        </PointContext.Provider>

    )
}

export default Root;