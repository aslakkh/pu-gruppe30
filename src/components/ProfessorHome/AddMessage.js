/**
 * Created by jan on 21/03/2017.
 */
import React, { Component } from 'react'
import firebase from 'firebase';
import {ref } from '../../config/constants'
import {FieldGroup, FormControl} from 'react-bootstrap'


/*
* Lets the professor add a message the student can see
 */

export default class AddMessage extends Component {
    constructor(props){
        super(props);
        this.state={
            courseID:this.props.courseID,
            value: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e){
        e.preventDefault();
        this.castMessageToFirebase()


    };
    /*
    * Send the message to firebase and uses timestap as ID
    */
     castMessageToFirebase(){

         const userUid = firebase.auth().currentUser.uid;
         console.log(this.state.courseID);
         console.log(this.message.value);
         console.log('courses/'+this.state.courseID+'/Messages/'+ Date.now());
         const timeRef = ref.child('courses/'+this.state.courseID+'/Messages/'+ Date.now());
         timeRef.set({
             Message: this.message.value
         });
         this.setState({value: ""});
         this.message.value = "";
         this.checkMessage()
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }

    checkMessage(){
        if (this.state.value === ""){
            return true
        }
        else {
            return false
        }

    }

    render(){
        return(


            <form onSubmit={this.handleSubmit}>
                <FormControl
                    id="formControlsText"
                    type="text"
                    inputRef={ (ref) => {this.message = ref;}}
                    label="Message"
                    placeholder="Message"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
                <button disabled={this.checkMessage()} type="submit" className="btn btn-primary">Submit</button>

            </form>

        )
    }


}