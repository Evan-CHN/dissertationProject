export const defaultSentimentDistributionOptions =
    {
        title: {
            text: 'Sentimental Polarity Distribution',
            right: 'center',

        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            y: 'bottom',
            textStyle: {
                fontSize: 15

            }
        },

        series: []
    }

export function sentimentDistributionOptionsReducer(state, action) {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                series:
                    [
                        {
                            name: 'sentiment',
                            type: 'pie',
                            radius: '50%',
                            data: [
                                {value: action.payload.data['num_pos_reviews'], name: 'positive reviews'},
                                {value: action.payload.data['num_neg_reviews'], name: 'negative reviews'}
                            ]
                        }
                    ]
            }
        default:
            throw new Error()
    }
}