import React, { Component } from 'react';
import '../styles/Home.scss';
import ImageList from './ImageList';
import UploadImage from './UploadImage';
import { connect } from 'react-redux';
import { changeOrder, updatePhotosAction } from '../actions/photos-actions';
import axios from 'axios';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'



export class Home extends Component {
    state = {
        selected: 'portrait',
        isSaving: false
    }

    constructor(props) {
        super(props);
            this.changeSelected = this.changeSelected.bind(this);
            this.saveAlbum = this.saveAlbum.bind(this);
        }
    
    changeSelected(select, index, direction) {
        this.setState({ selected: select });

        const API_GET_PHOTOS = new Promise((resolve, reject) => {
            
            //Make the call 
            axios.get(`http://localhost:3000/api/images/` + select)
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

    saveAlbum() {
        if(this.props.photos.length >= 1) {
            this.setState({isSaving: true})
            let newArray = []
            let index = 0
            this.props.photos.forEach(element => {
                newArray.push({image_url: element.image_url, album: element.album, order: index++})
            });
            JSON.stringify(newArray)

            axios.delete(`http://localhost:3000/api/delete/` + this.state.selected)
                .then(response => {
                    axios.post('http://localhost:3000/api/savealbum', newArray, {headers: {'content-type': 'application/json'}}) 
                })
                .then(response => {
                    setTimeout(() => {
                        this.setState({isSaving: false})
                    }, 600)  
                })
                .catch(err => {
                    console.log(err);
                });
        }
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

                    {this.state.isSaving ? 
                        (<div className="home__content__loader">
                            <Loader
                            type="TailSpin"
                            color="black"
                            height={100}
                            width={100}/>
                            
                        </div>
                        ) :
                    (<div>
                        <ImageList category={this.state.selected} deleteItem={this.deleteItem}/>
                        <UploadImage localUpload={this.localUpload} category={this.state.selected}/>
                        <button onClick={() => this.saveAlbum()} className="home__content__save-button">Save Album</button>
                    </div>)
                    }
                    
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

