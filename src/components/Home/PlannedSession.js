/**
 * Created by jan on 07/03/2017.
 */
import React, { Component } from 'react'
import {Button, ProgressBar, ListGroup, ListGroupItem, Grid,Col,Row} from 'react-bootstrap'


function Test(props){
    return(
        <ListGroup>
            <ListGroupItem>Link 1</ListGroupItem>
            <ListGroupItem onClick={ (link) => props.this.callbackParent(link)}>Link 2</ListGroupItem>
        </ListGroup>


    )
}




export default class PlannedSession extends Component{

    callbackParent(item){
        console.log(item)
    }

    constructor(props){
        super(props)
        this.state={
            desc: "hei"
        }
    }




    render(){
        return(
            <Test this={this}/>
        )
    }
}