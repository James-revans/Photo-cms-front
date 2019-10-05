import React, { Component } from 'react';
import '../styles/ImageBlade.scss';

export class ImageBlade extends Component {

    render() {
        return (
            <div className="image-blade">
                <img className="image-blade__img" src={'http://localhost:3000/photos/' + this.props.category + '/' + this.props.item.filename} alt="sg"></img>
                <div className="image-blade__arrows">
                    <div onClick={() => this.props.onchangeOrder(this.props.category, this.props.index, -1)} className="image-blade__arrows__up"></div>
                    <div onClick={() => this.props.onchangeOrder(this.props.category, this.props.index, 1)} className="image-blade__arrows__down"></div>
                </div>
            </div>
        )
    }
}

export default ImageBlade
