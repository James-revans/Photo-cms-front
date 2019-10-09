import React, { Component } from 'react'
import DragSortableList from 'react-drag-sortable'
import '../styles/ImageList.scss'
import ImageBlade from './ImageBlade'
import { connect } from 'react-redux'
import { changeOrder } from '../actions/photos-actions'

export class ImageList extends Component {
    state = {
        newList: []
    }

    constructor(props) {
        super(props)
        this.onchangeOrder = this.onchangeOrder.bind(this);
    }
    onchangeOrder(newList) {
        this.props.onchangeOrder(newList);
    }
    render() {
        // <div className="image-lists">
        //     <div className="image-lists__portraits">
        // {(this.props.photos.map((item, index) =>
        //     <ImageBlade item={item} key={index} index={index} category={this.props.category} deleteItem={this.props.deleteItem}/>
        // ))}
        //     </div>
        // </div>
        var onSort = function(sortedList) {
            console.log("sortedList", sortedList);
        }
        var list = []
        this.props.photos.forEach((item, index) => {
            list.push({
                content: (<ImageBlade item={item} key={index} index={index} category={this.props.category} deleteItem={this.props.deleteItem}/>),
                classes: ['image-list__photo']
            })
        });

        return (
            <div className="image-list">
                <DragSortableList items={list} moveTransitionDuration={0.3} onSort={onSort} type="vertical"/>
            </div>
        ) 
    }
}

const mapStateToProps = state => ({
    photos: state.photos
});

const mapActionsToProps = {
    onchangeOrder: changeOrder
};

export default connect (mapStateToProps, mapActionsToProps) (ImageList)
