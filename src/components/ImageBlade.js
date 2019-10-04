import React, { Component } from 'react';
import '../styles/ImageBlade.scss';
import { connect } from 'react-redux';
import { changeOrderUp } from '../actions/portraits-actions';

export class ImageBlade extends Component {

    state = {
    }
    
    constructor(props) {
        super(props);

        this.onchangeOrderUp = this.onchangeOrderUp.bind(this);
    }

    onchangeOrderUp(category, index) {
        if(index === 0) {
            return
        }
        let oldArray = [];
        if(category === 'portraits') {
            oldArray = this.props.portraits;
        }
        else if(category === 'family') {
            oldArray = this.props.family;
        }
        else if(category === 'events') {
            oldArray = this.props.events;
        }
        else if(category === 'misc') {
            oldArray = this.props.misc;
        }
        else {
            oldArray = this.props.recent;
        }
        let b = oldArray[index];
        oldArray[index] = oldArray[index-1];
        oldArray[index-1] = b
        
        this.props.onchangeOrderUp(oldArray);

    }

    render() {
        return (
            <div className="image-blade">
                <img className="image-blade__img" src={'http://localhost:3000/photos/' + this.props.category + '/' + this.props.item.filename} alt="sg"></img>
                <div className="image-blade__arrows">
                    <div onClick={() => this.onchangeOrderUp(this.props.category, this.props.index)} className="image-blade__arrows__up"></div>
                    <div onClick={() => this.onchangeOrderUp(this.props.category, this.props.index)} className="image-blade__arrows__down"></div>
                </div>
            </div>
        )
    }
}

const mapActionsToProps = {
    onchangeOrderUp: changeOrderUp

}

const mapStateToProps = state => ({
    portraits: state.portraits,
    family: state.family,
    events: state.events,
    misc: state.misc,
    recent: state.recent
});

export default connect(mapStateToProps, mapActionsToProps) (ImageBlade)
