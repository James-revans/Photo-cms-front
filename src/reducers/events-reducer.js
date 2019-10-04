export default function eventsReducer(state = [], { type, payload }) {
    switch (type) {
        case 'updateEvents':
            return payload;
        default:
            return state
    }
}