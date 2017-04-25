/**
 * Created by jan on 07/03/2017.
 */
import React, { Component } from 'react'
import { ListGroup, ListGroupItem} from 'react-bootstrap'
import firebase from 'firebase'
import {styles} from './StopwatchStyles.js'
import { plannedSession} from '../../helpers/auth'


function Test(props){
    this.getSessions = this.getSessions.bind(this);
    return(
        <ListGroup>
            <ListGroupItem>Link 1</ListGroupItem>
            <ListGroupItem onClick={ (link) => props.this.callbackParent(link)}>Link 2</ListGroupItem>
        </ListGroup>


    )
}




export default class PlannedSession extends Component{


    constructor(props){
        super(props);
        this.state={
            desc: "hei",
            emne: this.props.emne,
            course: this.props.course,
            sessions: this.props.course.plannedSessions,
            activeTabClassName: "tab1"
        }

    }


    componentWillReceiveProps(nextProps){
        this.setState({
            course: nextProps.course,
            emne: nextProps.emne,
            sessions: nextProps.course.plannedSessions,
        })
        //this.getSessions();
    }



getSessions(){
    const userUid = firebase.auth().currentUser.uid;
    firebase.database().ref().child('users/'+userUid+'/courses/'+this.state.emne+'/planned-sessions/').orderByValue().startAt().once('value', snap => {
        this.setState({
            sessions: snap.val()
        })
})
}

    handleClick(key){
    this.props.callbackParent(this.state.sessions[key].goal, key);
        this.setState({activeTabClassName:key})
    }



    render(){
        if(this.state.sessions == null || this.state.sessions == undefined){
            return <h4>No planned sessions</h4>
        }
        else{
            return(
                <div>
                    <h4>Planned Sessions</h4>
            <ListGroup >
                {Object.keys(this.state.sessions).map((key) => {
                    return <ListGroupItem key={key}  className={(this.state.activeTabClassName === key) ? "active" : ""} onClick={() => this.handleClick(key)}>
                        <div style={styles.plannedText}>{this.state.sessions[key].goal}</div>
                        <div style={styles.greyText}>{new Date(parseInt(key)).toDateString()}</div>
                    </ListGroupItem>
                })}
            </ListGroup>
                </div>
        )
        }
        
    }
}