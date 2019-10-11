import React, { Component } from 'react'
import DragSortableList from 'react-drag-sortable'
import '../styles/ImageList.scss'
import ImageBlade from './ImageBlade'
import { connect } from 'react-redux'
import { changeOrder } from '../actions/photos-actions'

export class ImageList extends Component {

    constructor(props) {
        super(props)
        this.onSort = this.onSort.bind(this);
    }
    
    onSort(sortedList) {
        let newArray = []
        sortedList.forEach(image => {
            newArray.push(image.content.props.item)
        })
        this.props.onchangeOrder(newArray); 
    }


    render() {
        var list = []
        if(this.props.photos.length > 0) {
            this.props.photos.map((item, index) => {
                list.push({
                    content: (<ImageBlade item={item} key={index} index={index} category={this.props.category} deleteItem={this.props.deleteItem}/>),
                    classes: ['image-list__photo']
                })
            });
        }

        return (
            <div className="image-list">
                <DragSortableList items={list} moveTransitionDuration={0.3} onSort={this.onSort} type="vertical"/>
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
