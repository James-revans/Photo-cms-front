import React, { Component } from 'react';
import '../styles/UploadImage.scss'
import axios from 'axios';
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { changeOrder } from '../actions/photos-actions';
import imageCompression from 'browser-image-compression';


export class UploadImage extends Component {
    state = {
        files: [],
        isUploading: false
      }

      constructor(props) {
        super(props)
        this.postData = this.postData.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }

      handleImageChange = (e) => {
        this.setState({
          files: Object.values(e.target.files)
        })
      };



      handleSubmit = (e) => {
        this.setState({isUploading: true})
        e.preventDefault();
        var options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        }
        
        this.state.files.forEach(imageFile => {
          let form_data = new FormData();
          imageCompression(imageFile, options)
            .then(compressedFile => {
              form_data.append('files', compressedFile, compressedFile.name);
              this.postData(form_data)
            })
        })
      }

      postData(form_data) {
        console.log('posting')
        // POST request to endpoint that will upload the image to mongodb and cloudinary with the authorization token
        axios.post(`https://photo-cms.herokuapp.com/api/image/` + this.props.category, 
        form_data, 
        {headers: 
          {
            'content-type': 'multipart/form-data',
            'Authorization': "bearer " + window.localStorage.getItem('token')
          }
        })
        // GET request that will display the photos once they have been uploaded to cloudinary and mongodb
        .then(response => {
          // axios.get(`https://photo-cms.herokuapp.com/api/image/` + this.props.category + `/` + window.localStorage.getItem('user'))
          
        const API_GET_PHOTOS = new Promise((resolve, reject) => {
            
          //Make the call 
          axios.get(`https://photo-cms.herokuapp.com/api/image/` + this.props.category + `/` + window.localStorage.getItem('user'))
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
                this.props.onchangeOrder(response)
            },
            err => this.props.onchangeOrder(err)
        )
        .then(this.setState({isUploading: false}))
        .catch(error => {
          console.log(error)
        });
        })


        .catch(function (error) {
          console.log(error.message);
        });
      }

    render() {
        return (
          <div className="image-upload">

          { this.state.isUploading ?
            (<Loader/>) :
            (
              <div><h1>Upload new {this.props.category} image</h1>
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
          </div>
        )
    }
}

const mapStateToProps = state => ({
  photos: state.photos
})

const mapActionsToProps = {
  onchangeOrder: changeOrder
}

export default connect(mapStateToProps, mapActionsToProps) (UploadImage)






// handleSubmit = (e) => {
//   this.setState({isUploading: true})
//   e.preventDefault();
//   console.log(this.state.files);
//   let form_data = new FormData();
//   this.state.files.forEach((image) => {
//       form_data.append('files', image, image.name);
//   })
  
//   axios.post(`https://photo-cms.herokuapp.com/api/image/` + this.props.category, 
//   form_data, 
//   {headers: 
//     {
//       'content-type': 'multipart/form-data',
//       'Authorization': "bearer " + window.localStorage.getItem('token')
//     }
//   })
//   .then(response => {
//     axios.get(`https://photo-cms.herokuapp.com/api/image/` + this.props.category + `/` + window.localStorage.getItem('user'))
    

//   const API_GET_PHOTOS = new Promise((resolve, reject) => {
      
//     //Make the call 
//     axios.get(`https://photo-cms.herokuapp.com/api/image/` + this.props.category + `/` + window.localStorage.getItem('user'))
//         .then((response) => {
//             resolve(response.data);
//         })
//         .catch((error) => {
//             reject(error);
//         });
//     }
//   )
//   API_GET_PHOTOS.then(
//       response => {
//           this.props.onchangeOrder(response)
//       },
//       err => this.props.onchangeOrder(err)
//   )
//   .then(this.setState({isUploading: false}))
//   .catch(error => {
//     console.log(error)
//   });
//   })
// }
