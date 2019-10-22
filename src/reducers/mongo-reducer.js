export default function MongoReducer(state = [], {type, payload}) {
    switch (type) {
        case 'updateMongo':
            return payload; 
        default:
            return state 
    }
}