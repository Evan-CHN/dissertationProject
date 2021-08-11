import React, {useContext} from 'react'
import {PointContext} from "./root";
import {Divider} from "antd";

function PointDetail() {
    const pointContext = useContext(PointContext)

    return (
        <div>
            <h1>Review Detail</h1>
            <Divider/>
            <h2>Original Review</h2>
            <i>{pointContext.point_state.original_review}</i>
            <Divider/>
            <h2>Processed Review</h2>
            <i>{pointContext.point_state.processed_review}</i>
            <Divider/>
            <h2>Sentiment</h2>
            <i>{pointContext.point_state.sentiment}</i>
        </div>
    )
}

export default PointDetail