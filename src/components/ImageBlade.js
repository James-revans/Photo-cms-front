import React, { Component } from 'react';
import '../styles/ImageBlade.scss';

export class ImageBlade extends Component {
    render() {
        return (
            <div className="image-blade">
                <img className="image-blade__img" src={this.props.img} alt="sg"></img>
                <div className="image-blade__arrows">
                    <div className="image-blade__arrows__up"></div>
                    <div className="image-blade__arrows__down"></div>
                </div>

            </div>
        )
    }
}

export default ImageBlade
