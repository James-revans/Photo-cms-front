import React, { Component } from 'react'
// import { createCoverageSummary } from 'istanbul-lib-coverage'
import ImageBlade from './ImageBlade';

export class ImageList extends Component {

    render() {
        return (
            <div className="image-lists">
                <div className="image-lists__portraits">
                    {this.props.array.map((image, index) => (
                        <ImageBlade img={image} key={index}/>
                    ))}
                </div>
                
            </div>
        )
        
    }
}

export default ImageList
