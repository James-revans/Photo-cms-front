import React, { Component } from 'react';
import '../styles/Home.scss';
import ImageList from './ImageList';
import axios from 'axios';
import UploadImage from './UploadImage';


export class Home extends Component {
    state = {
        selected: 'portraits',
        photoArray: []

    }

    constructor(props) {
        super(props);
            this.changeSelected = this.changeSelected.bind(this);

        }

    changeSelected(select) {
        const selected = select;
        console.log(select);
        axios.get(`http://localhost:3000/photos/` + selected)
        .then(res => {
        const array = (res.data);
        const photoArray = [];
        array.forEach((element) => {
            photoArray.push('http://localhost:3000/photos/' + selected + '/' + element.filename);
        });
        this.setState({ photoArray });
        this.setState({ selected });
        })
    }

    render() {

        return (     
            <div className="home">
                <div className="home__category-buttons">
                    <h2>Albums</h2>
                    <button onClick={() => this.changeSelected('portraits')}>Portraits</button>
                    <button onClick={() => this.changeSelected('family')}>Family</button>
                    <button onClick={() => this.changeSelected('events')}>Events</button>
                    <button onClick={() => this.changeSelected('misc')}>Misc</button>
                    <button onClick={() => this.changeSelected('recent')}>Recent</button>
                </div>
                <div className="home__content">
                    <ImageList array={this.state.photoArray}/>
                    <UploadImage category={this.state.selected}/>
                </div>
                
            </div>
        )
    }


}

export default Home

