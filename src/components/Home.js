import React, { Component } from 'react';
import '../styles/Home.scss';
import ImageList from './ImageList';
import UploadImage from './UploadImage';
import { connect } from 'react-redux';


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
        this.setState({ selected: select });

        switch(select) {
            
            case 'portraits':
                this.setState({ selected: select });
                return this.setState({ photoArray: this.props.portraits });
            case 'family':
                this.setState({ selected: select });
                return this.setState({ photoArray: this.props.family });
            case 'events':
                this.setState({ selected: select });
                return this.setState({ photoArray: this.props.events });
            case 'misc':
                this.setState({ selected: select });
                return this.setState({ photoArray: this.props.misc });
            case 'recent':
                this.setState({ selected: select });
                return this.setState({ photoArray: this.props.recent });
            default:
                return this.setState({ photoArray: this.props.portraits });
        }

        // axios.get(`http://localhost:3000/photos/` + selected)
        // .then(res => {
        // const array = (res.data);
        // const photoArray = [];
        // array.forEach((element) => {
        //     photoArray.push('http://localhost:3000/photos/' + selected + '/' + element.filename);
        // });
        // this.setState({ photoArray });
        // this.setState({ selected });
        // })
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
                    <ImageList array={this.state.photoArray} category={this.state.selected}/>
                    <UploadImage category={this.state.selected}/>
                </div>
                
            </div>
        )
    }
}


const mapStateToProps = state => ({
    portraits: state.portraits,
    family: state.family,
    events: state.events,
    misc: state.misc,
    recent: state.recent
});

export default connect(mapStateToProps) (Home)

