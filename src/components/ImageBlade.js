import React, { Component } from 'react';
import '../styles/ImageBlade.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import changeOrder from '../actions/photos-actions'
import axios from 'axios'


export class ImageBlade extends Component {
    state = {
        confirm_delete: false
    }
    constructor(props) {
        super(props)
        this.deleteItem = this.deleteItem.bind(this)
    }

    deleteItem(index) {
        // This will remove the image and update the store with the action onchangeorder


        axios.delete(`https://photo-cms.herokuapp.com/api/delete`, {headers: {'Authorization': "bearer " + window.localStorage.getItem('token')}, data: {photo: this.props.photos[index]}})
        .then(response => {
            console.log(response)
            let newArray = [...this.props.photos];
            newArray.splice(index, 1);        
            this.props.onchangeOrder(newArray); 
        })
        .catch(err => {
            console.log(err);
        });
    }   
    

    render() {
        return (
            <div className="image-blade">
                <img className="image-blade__img" src={this.props.item.image_url} alt="sg"></img>
                <div className="image-blade__delete"><button onClick={() => this.setState({ confirm_delete: true })}><FontAwesomeIcon icon={faTrashAlt}/></button></div>
                { this.state.confirm_delete && 
                    <div className="image-blade__delete-modal">
                        <h3>Are you sure you want to delete this image?</h3>
                        <div className="image-blade__delete-modal__buttons">
                            <div className="delete"><button onClick={() => {this.deleteItem(this.props.index); this.setState({ confirm_delete: false })}}>Delete</button></div>
                            <div className="cancel"><button onClick={() => this.setState({ confirm_delete: false })}>Cancel</button></div>
                        </div>

                    </div>
                };

            </div>
        )
    }
}

const mapStateToProps = state => ({
    photos: state.photos
});

const mapActionsToProps = {
    onchangeOrder: changeOrder,
}


export default connect (mapStateToProps, mapActionsToProps) (ImageBlade)
