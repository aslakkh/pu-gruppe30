/**
 * Created by jan on 21/03/2017.
 */
import React, { Component } from 'react'
import firebase from 'firebase';
import {ref } from '../../config/constants'
import {FieldGroup, ListGroup, ListGroupItem, Button} from 'react-bootstrap'
import {styles} from './../Dashboard/CoursesListStyles.js'


/*
* Displays list of messages and delete selected messages.
*/

export default class MessageList extends Component {
    constructor(props){
        super(props);
        this.state={
            courseID: this.props.courseID,
            messages:undefined
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            courseID: nextProps.courseID
        })
        this.getCommentsFromFirebase(nextProps.courseID)

    }

    getCommentsFromFirebase(id){
        this.messageRef = firebase.database().ref();
        let that = this;
        var messages =[];
        this.messageRef.child('courses/'+id+'/Messages').on('value', function(snapshot) {
            messages=[]
            snapshot.forEach(function(data){
                messages.unshift([ data.key,data.val().Message])
            });
            that.messages = messages
            that.forceUpdate()
    })
    }

    componentDidMount(){
        this.getCommentsFromFirebase(this.state.courseID)
    }
    componentWillUnmount(){
        this.messageRef
    }
/*
    Deletes selected message
 */
handleClick(key) {
    var userRef = ref.child('courses/' + this.state.courseID + '/Messages/');
    userRef.child(key).remove();
}
    render(){

        if(this.messages === undefined || this.messages.length === 0){
            return(
                <h5>No Messages</h5>
            );
        }
        else{
            return(
                <div style={{marginTop: '10px'}}>
                    <h4 style={{marginTop: '10px', marginBottom: '10px',}}>Currently displaying following messages to students: </h4>
                    <ListGroup >
                        {Object.keys(this.messages).map((key,i) => {
                            return <ListGroupItem key={key} className="CoursesList" style={styles.coursesList}>
                                <h4>{this.messages[key][1]}</h4>

                                <Button  bsStyle="danger" onClick={() => this.handleClick(this.messages[key][0])}>Delete</Button>
                            </ListGroupItem>
                        })}
                    </ListGroup>
                </div>
            );
        }


    }
}