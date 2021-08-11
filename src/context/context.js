export const defaultOptions =
    {
        grid3D: {},
        xAxis3D: {},
        yAxis3D: {},
        zAxis3D: {},
        legend: {},
        series: []
    }

export function optionReducer(state, action) {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                series: [
                    {
                        name: 'NEG',
                        type: 'scatter3D',
                        symbolSize: 5,
                        data: action.payload.data['neg_points']
                    }, {
                        name: 'POS',
                        type: 'scatter3D',
                        symbolSize: 5,
                        data: action.payload.data['pos_points']
                    }

                ]
            }
        default:
            throw new Error()
    }
}

