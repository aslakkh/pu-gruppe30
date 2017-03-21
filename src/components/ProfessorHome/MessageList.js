/**
 * Created by jan on 21/03/2017.
 */
import React, { Component } from 'react'
import firebase from 'firebase';
import {ref } from '../../config/constants'
import {Form, FieldGroup, FormControl, ListGroup, ListGroupItem, Button} from 'react-bootstrap'


/*
* Displays list of messages and delete selected messages.
*/

export default class MessageList extends Component {
    constructor(props){
        super(props)
        this.state={
            courseID: this.props.courseID,
            messages:undefined
        }
    }

    getCommentsFromFirebase(){
        let messageRef = firebase.database().ref();
        let that = this;
        var messages =[]
        var koder = []
        messageRef.child('courses/'+this.state.courseID+'/Messages').on('value', function(snapshot) {
            snapshot.forEach(function(data){
                messages.unshift([ data.key,data.val().Message])

            })
            that.setState({
                messages:messages
            })
            messages=[]
    })
        console.log(this.state.messages)
    }

    componentWillMount(){
        this.getCommentsFromFirebase()
    }


handleClick(key) {
    var userRef = ref.child('courses/' + this.state.courseID + '/Messages/');
    userRef.child(key).remove();
}
    render(){

        if(this.state.messages === undefined || this.state.messages === null){
            return(
                <h5>You have no active courses. Add a course below.</h5>
            );
        }
        else{
            return(
                <div>

                    <ListGroup >
                        {Object.keys(this.state.messages).map((key,i) => {
                            return <ListGroupItem key={key} className="CoursesList">
                                {this.state.messages[key][1]}

                                <Button bsStyle="danger" onClick={() => this.handleClick(this.state.messages[key][0])}>Delete</Button>
                            </ListGroupItem>
                        })}
                    </ListGroup>
                </div>
            );
        }


    }
}