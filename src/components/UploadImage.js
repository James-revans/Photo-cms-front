import React, { Component } from 'react';
import '../styles/UploadImage.scss'

export class UploadImage extends Component {

    render() {
        return (
            <div className="image-upload">
                <h1>Upload new {this.props.category} image</h1>
                <form action={'http://localhost:3000/upload' + this.props.category} method="POST" encType="multipart/form-data">
                    <label className="custom-file-upload">
                        <input type="file" name="files" id="files" multiple></input>
                        Upload Image
                    </label>
                    <input type="submit" value="Submit" className="submit"></input>
                </form>
            </div>
        )
    }
}

export default UploadImage
