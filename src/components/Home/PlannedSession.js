/**
 * Created by jan on 07/03/2017.
 */
import React, { Component } from 'react'
import {Button, ProgressBar, ListGroup, ListGroupItem, Grid,Col,Row} from 'react-bootstrap'
import firebase from 'firebase'


function Test(props){
    return(
        <ListGroup>
            <ListGroupItem>Link 1</ListGroupItem>
            <ListGroupItem onClick={ (link) => props.this.callbackParent(link)}>Link 2</ListGroupItem>
        </ListGroup>


    )
}




export default class PlannedSession extends Component{


    constructor(props){
        super(props)
        this.state={
            desc: "hei",
            emne: this.props.emne
        }

    }
componentWillMount(){
    let that = this
    const userUid = firebase.auth().currentUser.uid;
    firebase.database().ref().child('users/'+userUid+'/courses/'+that.state.emne+'/planned-sessions/').orderByValue().startAt().on('value', snap => {
        console.log(snap.val())
        that.setState({
            sessions: snap.val()
        })
        console.log(snap.val())
})
}

    handleClick(key){
        this.props.callbackParent(key);
    }



    render(){
        return(
            <ListGroup >
                {Object.keys(this.state.sessions).map((key) => {
                    return <ListGroupItem key={key} className="CoursesList">
                        {this.state.sessions[key].goal}
                        {console.log(key)}
                        {new Date(parseInt(key)).toISOString()}
                    </ListGroupItem>
                })}
            </ListGroup>
        )
    }
}