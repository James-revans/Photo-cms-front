export default function miscReducer(state = [], { type, payload }) {
    switch (type) {
        case 'updateMisc':
            return payload;
        default:
            return state
    }
}