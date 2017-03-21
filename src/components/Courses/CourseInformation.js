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

    componentWillMount(){
        /*console.log("inside courseinformation");
        console.log(this.props.courseID);
        console.log(getCourseMessages(this.props.courseID))*/
        
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

    msToDateString(dateInMs){
        let d = new Date(parseInt(dateInMs));
        return (d.toDateString());
    }


    render(){
        //render based on if course has messages
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
                                    return <ListGroupItem key={key} header={this.msToDateString(key)} className="MessagesListItem"> 
                                                <h5>{this.state.messages[key].Message}</h5>
                                            </ListGroupItem>
                                })} 
                    </ListGroup>
                </Panel>
            </div>
        );
        }
        

    }
}