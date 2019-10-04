export default function recentReducer(state = [], { type, payload }) {
    switch (type) {
        case 'updateRecent':
            return payload;
        default:
            return state
    }
}