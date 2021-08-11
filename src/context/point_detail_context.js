export const defaultPointDetails =
    {
        processed_review: '',
        original_review: '',
        sentiment: ''
    }

export function pointDetailsReducer(state, action) {
    switch (action.type) {
        case 'CHANGE':
            return {
                'processed_review': action.payload.data['processed_review'],
                'original_review': action.payload.data['original_review'],
                'sentiment': action.payload.data['sentiment']
            }
        default:
            throw new Error()
    }
}