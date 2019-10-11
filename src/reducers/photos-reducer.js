


export default function PhotosReducer(state = [], {type, payload}) {
    switch (type) {
        case 'updatePhotos':
            console.log('first')
            return payload; 
        case 'changeOrder':
            console.log('change order')
            return payload
        default:
            return state 
    }
}
