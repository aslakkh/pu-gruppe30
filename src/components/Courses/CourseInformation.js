import React, { Component } from 'react'
import {ListGroup, ListGroupItem, Panel} from 'react-bootstrap'
import { getCourseMessages } from '../../helpers/auth'
import firebase from 'firebase';
import './CourseInformation.css';


export default class CourseInformation extends Component{
    /*get information from Firebase (course/messages/something)
    display list of five last messages
    */

    constructor(props){
        super(props);
        this.state={
            courseID: this.props.courseID,
        }
    }

    componentWillReceiveProps(nextProps){
        var messages = this.getMessages();
        this.setState({
            courseID: nextProps.courseID,
            messages: messages,
        })
    }
    //retreive messages from firebase, set component state
    componentDidMount(){
        let that = this;
        var courseRef = firebase.database().ref().child('courses/'+this.state.courseID+'/Messages');
        courseRef.on('value', snap => {
            that.setState({
                messages: snap.val(),
            });
        });
        
    }

    getMessages(){
        let that = this;
        var courseRef = firebase.database().ref().child('courses/'+this.state.courseID+'/Messages');
        var messages;
        courseRef.on('value', snap => {
            messages = snap.val();
        });
        return messages;
    }

    msToDateString(dateInMs){
        let d = new Date(parseInt(dateInMs));
        return (d.toDateString());
    }


    render(){
        //render based on if course has messages
        console.log("COURSE INFO: " + this.state.courseID);
        if(this.state.messages === null || this.state.messages === undefined){
            return(
                <div>
                <Panel bsStyle="info" collapsible defaultExpanded header="Messages from course staff" className="PanelHeader">
                    <ListGroup fill>
                        <ListGroupItem><h5>No messages to be displayed.</h5></ListGroupItem>
                    </ListGroup>
                </Panel>
            </div>
            )
        }
        else{
            return(
            <div>
                <Panel bsStyle="info" collapsible defaultExpanded header="Messages from course staff" className="PanelHeader">
                    <ListGroup fill>
                        {Object.keys(this.state.messages).map((key) => {
                                    return <ListGroupItem key={key} header={this.state.messages[key].Message} className="MessagesListItem">
                                                <h5>{this.msToDateString(key)}</h5>
                                            </ListGroupItem>
                                })} 
                    </ListGroup>
                </Panel>
            </div>
        );
        }
        

    }
}