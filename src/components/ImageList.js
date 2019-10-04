import React, { Component } from 'react'
// import { createCoverageSummary } from 'istanbul-lib-coverage'
import ImageBlade from './ImageBlade';

export class ImageList extends Component {

    render() {
        return (
            <div className="image-lists">
                <div className="image-lists__portraits">
                    {this.props.array.map((item, index) => (
                        <ImageBlade item={item} key={index} index={index} category={this.props.category}/>
                    ))}
                </div>
            </div>
        )
    }
}

export default ImageList
