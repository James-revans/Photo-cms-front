export default function PhotosReducer(state = [], {type, payload}) {
    switch (type) {
        case 'updatePhotos':
            return payload; 
        case 'changeOrder':
            return payload
        default:
            return state 
    }
}
