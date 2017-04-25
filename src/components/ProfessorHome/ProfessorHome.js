/**
 * Created by jan on 18/03/2017.
 */
import React, { Component } from 'react'
import Sidebar from './Sidebar'
import firebase from 'firebase';
import {getUserUid} from '../../helpers/auth'


/*
* "Start"-site for the professor.
 */

export default class ProfessorHome extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount(){ //get courses data from firebase
    let courseRef = firebase.database().ref();
    let userUid = getUserUid();
    courseRef.child('users/'+userUid+'/courses').orderByChild('active').equalTo(true).on('value', snap => {
      this.setState({
        courses: snap.val()
      });

    })
  }
  
  componentWillUnmount(){ //remove listener
    let courseRef = firebase.database().ref();
    let userUid = getUserUid();
    courseRef.child('users/'+userUid+'/courses').orderByChild('active').equalTo(true).off();
  }


    render() {
        return (
            <Sidebar courses={this.state.courses}/>

        )
    }

}