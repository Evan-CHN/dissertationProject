import React, {useContext, useEffect, useRef} from 'react'
import {Button, Col, Divider, Row} from 'antd'
import {BarContext, PieContext} from './root'
import axios from 'axios'

var echarts = require('echarts');

function CorpusDescription() {
    const pieChartRef = useRef()
    const barChartRef = useRef()
    let PIE_CHART = null
    let BAR_CHART = null
    const pieContext = useContext(PieContext)
    const barContext = useContext(BarContext)

    function renderCharts() {
        const piechart = echarts.getInstanceByDom(pieChartRef.current)
        const barChart = echarts.getInstanceByDom(barChartRef.current)
        if (piechart) {
            PIE_CHART = piechart
        } else {
            PIE_CHART = echarts.init(pieChartRef.current)
        }
        if (barChart) {
            BAR_CHART = barChart

        } else {
            BAR_CHART = echarts.init(barChartRef.current)
        }
        PIE_CHART.setOption(pieContext.pie_state)
        BAR_CHART.setOption(barContext.bar_state)
    }

    useEffect(() => {
        renderCharts()
    })
    return (
        <div className={"CorpusDescription"}>
            <p>
                IMDb (an acronym for Internet Movie Database) is an online database of information related to films,
                television programs, home videos, video games, and streaming content online – including cast, production
                crew and personal biographies, plot summaries, trivia, ratings, and fan and critical reviews. An
                additional fan feature, message boards, was abandoned in February 2017. Originally a fan-operated
                website, the database is now owned and operated by IMDb.com, Inc., a subsidiary of Amazon.
                As of December 2020, IMDb has approximately 7.5 million titles (including episodes) and 10.4 million
                personalities in its database, as well as 83 million registered users.
                IMDb began as a movie database on the Usenet group "rec.arts.movies" in 1990 and moved to the web in
                1993.
                <br/>
                -- From Wikipedia
            </p>
            <Divider/>
            <p>
                Specifically, to make the result of data vectorization more clear and straightforward, I randomly select
                5000 data from the classical IMDB dataset, which can remain the ANN models' effectiveness as well.
            </p>
            <p>
                To show more details of the corpus ,please press "Analysis" button below.
            </p>
            <Button type={"primary"} onClick={() => {
                axios.get('http://localhost:5000/get_corpus_stat').then(response => {
                    pieContext.pie_dispatch({
                        type: 'CHANGE',
                        payload: {
                            data: {
                                num_pos_reviews: response.data['sentiment_polarity']['num_pos_reviews'],
                                num_neg_reviews: response.data['sentiment_polarity']['num_neg_reviews']
                            }
                        }
                    })
                    barContext.bar_dispatch({
                            type: 'CHANGE',
                            payload: {
                                data: {
                                    lessThan100: response.data['review_length_data']['<=100'],
                                    from100to500: response.data['review_length_data']['100-500'],
                                    from500to1000: response.data['review_length_data']['500-1000'],
                                    from1000to1500: response.data['review_length_data']['1000-1500'],
                                    from1500to2000: response.data['review_length_data']['1500-2000'],
                                    largerThan2000: response.data['review_length_data']['>=2000'],
                                }
                            }
                        }
                    )
                }).catch(error => {
                    console.log(error)
                })
            }
            }>
                Analysis
            </Button>
            <br/>
            <br/>
            <Row>
                <Col span={12}>
                    <div style={{width: "400px", height: "400px"}} ref={pieChartRef}/>
                </Col>
                <Col span={12}>
                    <div style={{width: "600px", height: "400px"}} ref={barChartRef}/>
                </Col>
            </Row>
        </div>
    )
}

export default CorpusDescription;