export const updatePhotosAction = (array) => {
    console.log(array);
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