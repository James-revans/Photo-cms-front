export default function familyReducer(state = [], { type, payload }) {
    switch (type) {
        case 'updateFamily':
            return payload;
        default:
            return state
    }
}