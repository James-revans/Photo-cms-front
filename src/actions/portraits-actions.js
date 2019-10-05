const updatePortraitsAction = {
    type: 'updatePortraits',
    payload: []
};

export const CHANGE_ORDER = 'array:changeOrder'

export function changeOrder(array) {
    console.log('action');
    return {
        type: CHANGE_ORDER,
        payload: array
    }
}

export default updatePortraitsAction
