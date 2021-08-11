export const defaultReviewLengthStatOptions =
    {
        title: {
            text: 'Review Length Distribution',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis:
            [
                {
                    type: 'category',
                    data: ['<=100', '100-500', '500-1000', '1000-1500', '1500-2000', '>=2000'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],

        yAxis: {
            type: 'value'
        },
        series: [{
            data: [0, 0, 0, 0, 0, 0],
            type: 'bar',
        }]
    }

export function ReviewLengthStatOptionsReducer(state, action) {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                series:
                    [{
                        data: [action.payload.data['lessThan100'],
                            action.payload.data['from100to500'],
                            action.payload.data['from500to1000'],
                            action.payload.data['from1000to1500'],
                            action.payload.data['from1500to2000'],
                            action.payload.data['largerThan2000']],
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        }
                    }]
            }
        default:
            throw new Error()
    }
}