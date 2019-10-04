import axios from 'axios';

const API_GET_PORTRAITS = () => {
    return new Promise(
        (resolve, reject) => {
    
            //Make the call 
            axios.get(`http://localhost:3000/photos/portraits`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        }
    )
}

const API_GET_FAMILY = () => {
    return new Promise(
        (resolve, reject) => {
    
            //Make the call 
            axios.get(`http://localhost:3000/photos/family`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        }
    )
}

const API_GET_EVENTS = () => {
    return new Promise(
        (resolve, reject) => {
    
            //Make the call 
            axios.get(`http://localhost:3000/photos/events`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        }
    )
}

const API_GET_MISC = () => {
    return new Promise(
        (resolve, reject) => {
    
            //Make the call 
            axios.get(`http://localhost:3000/photos/misc`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        }
    )
}

const API_GET_RECENT = () => {
    return new Promise(
        (resolve, reject) => {
    
            //Make the call 
            axios.get(`http://localhost:3000/photos/recent`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        }
    )
}

export {
    API_GET_PORTRAITS,
    API_GET_FAMILY,
    API_GET_EVENTS,
    API_GET_MISC,
    API_GET_RECENT
}
