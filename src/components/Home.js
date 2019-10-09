import React, { Component } from 'react';
import '../styles/Home.scss';
import ImageList from './ImageList';
import UploadImage from './UploadImage';
import { connect } from 'react-redux';
import { changeOrder, updatePhotosAction } from '../actions/photos-actions';
import axios from 'axios';


export class Home extends Component {
    state = {
        selected: 'portrait',
        photoArray: []
    }

    constructor(props) {
        super(props);
            this.changeSelected = this.changeSelected.bind(this);
            // this.saveAlbum = this.saveAlbum.bind(this);
            this.deleteItem = this.deleteItem.bind(this);
        }
    
    changeSelected(select, index, direction) {
        const API_GET_PHOTOS = new Promise((resolve, reject) => {
            
            //Make the call 
            axios.get(`http://localhost:3000/images/` + select)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
            }
        )
        API_GET_PHOTOS.then(
            response => {
                this.props.onupdatePhotosAction(response)
                this.setState({ selected: select });
            },
            err => this.props.onupdatePhotosAction(err)
        )
    }

    deleteItem(index) {
        // on click, this deletes the image from mongoDB on refreshing the page
        // updates store with new array

        axios.delete(`http://localhost:3000/delete/` + this.state.selected + '/' + this.state.photoArray[index].filename)
        .then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
            console.log(error);
        });

        let oldArray = this.state.photoArray;
        oldArray.splice(index, 1);        
        this.props.onchangeOrder(oldArray);

        return this.setState({ photoArray: oldArray });
    }   


    render() {

        return (     
            <div className="home">
                <div className="home__category-buttons">
                    <h2>Albums</h2>
                    <button onClick={() => this.changeSelected('portrait')}>Portraits</button>
                    <button onClick={() => this.changeSelected('family')}>Family</button>
                    <button onClick={() => this.changeSelected('events')}>Events</button>
                    <button onClick={() => this.changeSelected('misc')}>Misc</button>
                    <button onClick={() => this.changeSelected('recent')}>Recent</button>
                </div>
                <div className="home__content">
                    <ImageList category={this.state.selected} deleteItem={this.deleteItem}/>
                    <UploadImage localUpload={this.localUpload} category={this.state.selected}/>
                    <button onClick={() => this.saveAlbum()} className="home__content__save-button">Save Album</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    photos: state.photos
});

const mapActionsToProps = {
    onchangeOrder: changeOrder,
    onupdatePhotosAction: updatePhotosAction
};

export default connect(mapStateToProps, mapActionsToProps) (Home)

