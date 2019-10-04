import CHANGE_ORDER_UP from '../actions/portraits-actions';

export default function portraitsReducer(state = [], { type, payload }) {
    switch (type) {
        case 'updatePortraits':
            return payload;
        case CHANGE_ORDER_UP:
            return payload;
        default:
            return state
    }
}
