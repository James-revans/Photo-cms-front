import React, { Component } from 'react';
import '../styles/Home.scss';
import ImageList from './ImageList';
import UploadImage from './UploadImage';
import { connect } from 'react-redux';
import { changeOrder } from '../actions/portraits-actions';


export class Home extends Component {
    state = {
        selected: 'portraits',
        photoArray: []
    }

    constructor(props) {
        super(props);
            this.changeSelected = this.changeSelected.bind(this);
            this.onchangeOrder = this.onchangeOrder.bind(this);
        }
    
    changeSelected(select, index, direction) {
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
    }

    onchangeOrder(category, index, direction) {
        if(index === 0) {
            return
        }
        let oldArray = this.state.photoArray;
        let b = oldArray[index];
        oldArray[index] = oldArray[index + direction];
        oldArray[index + direction] = b

        this.props.onchangeOrder(oldArray);
        return this.setState({ photoArray: oldArray });
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
                    <ImageList array={this.state.photoArray} category={this.state.selected} onchangeOrder={this.onchangeOrder}/>
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

const mapActionsToProps = {
    onchangeOrder: changeOrder
};

export default connect(mapStateToProps, mapActionsToProps) (Home)

