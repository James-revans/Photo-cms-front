export const updatePhotosAction = (array) => {
    return {
        type: 'updatePhotos',
        payload: array
    }
};

export const changeOrder = (array) => {
    return { 
        type: 'changeOrder',
        payload: array
    }
}

export default updatePhotosAction