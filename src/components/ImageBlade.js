import React, { Component } from 'react';
import '../styles/ImageBlade.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'


export class ImageBlade extends Component {
    state = {
        confirm_delete: false
    }
    constructor(props) {
        super(props)
        // this.onchangeOrder = this.onchangeOrder.bind(this);

    }
    
    onchangeOrder(category, index, direction) {
        // let newArray = [...this.props.photos]
        // if((index === 0 && direction === -1) || (index === newArray.length-1 && direction === 1)) {
        //     return
        // }
        // let a = newArray[index + direction];
        // let b = newArray[index];
        
        // newArray[index] = a;
        // newArray[index + direction] = b
        
        // this is action for portraits
        // this.props.onchangeOrder(newArray);
    }

    render() {
        return (
            <div className="image-blade">
                <img className="image-blade__img" src={'http://localhost:3000/images/' + this.props.category + '/' + this.props.item.filename} alt="sg"></img>
                <div className="image-blade__delete"><button onClick={() => this.setState({ confirm_delete: true })}><FontAwesomeIcon icon={faTrashAlt}/></button></div>
                { this.state.confirm_delete && 
                    <div className="image-blade__delete-modal">
                        <h3>Are you sure you want to delete this image?</h3>
                        <button onClick={() => {this.props.deleteItem(this.props.index); this.setState({ confirm_delete: false })}}>delete</button>
                        <button onClick={() => this.setState({ confirm_delete: false })}>cancel</button>
                    </div>
                };
                {/* <div className="image-blade__arrows">
                    <div onClick={() => this.onchangeOrder(this.props.category, this.props.index, -1)} className="image-blade__arrows__up"></div>
                    <div onClick={() => this.onchangeOrder(this.props.category, this.props.index, 1)} className="image-blade__arrows__down"></div>
                </div> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    photos: state.photos
});

// const mapActionsToProps = {
//     onchangeOrder: changeOrder
// };

export default connect (mapStateToProps) (ImageBlade)
