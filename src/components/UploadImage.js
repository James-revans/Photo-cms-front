import React, { Component } from 'react';
import '../styles/UploadImage.scss'
import axios from 'axios';

export class UploadImage extends Component {
    state = {
        files: []
      }

      handleImageChange = (e) => {
        this.setState({
          files: Object.values(e.target.files)
        })
      };
    
      handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.files);
        let form_data = new FormData();
        this.state.files.forEach((image) => {
            form_data.append('files', image, image.name);
        })

        let url = 'http://localhost:3000/upload' + this.props.category;

        axios.post(url, form_data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
            .then(res => {
              console.log(res.data);
            })
            .catch(err => console.log(err))
      };

    render() {
        return (
            <div className="image-upload">
                <h1>Upload new {this.props.category} image</h1>
                <form onSubmit={this.handleSubmit}  encType="multipart/form-data">
                    <label className="custom-file-upload">
                        <input type="file" name="files" id="files" multiple onChange={this.handleImageChange} ></input>
                        Upload Image
                    </label>
                    <input type="submit" value="Submit" className="submit"></input>
                </form>
            </div>
        )
    }
}

export default UploadImage
