import React, { Component } from 'react'
import Sidebar from './Sidebar'
import firebase from 'firebase';
import {getUserUid} from '../../helpers/auth'

export default class Home extends Component {
  constructor(props){
    super(props);

    this.state=({
        authed: this.props.authed,
        admin: this.props.admin
    })
  };
  componentWillReceiveProps(nextProps){
      // if(Object.keys(nextProps.courses).length !== Object.keys(this.state.courses).length){
      //   console.log("updating home state");
      //   this.setState({
      //     courses: nextProps.courses,
      //   })
      // }
      this.setState({
          authed: nextProps.authed,
          admin: nextProps.admin
      });
  }

  componentDidMount(){
    let courseRef = firebase.database().ref();
    let userUid = getUserUid();
    courseRef.child('users/'+userUid+'/courses').orderByChild('active').equalTo(true).on('value', snap => {
      this.setState({
        courses: snap.val()
      });

    })
  }
  
  componentWillUnmount(){
    let courseRef = firebase.database().ref();
    let userUid = getUserUid();
    courseRef.child('users/'+userUid+'/courses').orderByChild('active').equalTo(true).off();
  }

  render () {
      if(this.state.authed && (this.state.admin != undefined || this.state.admin != null)){
          if(this.state.courses != undefined && this.state.courses != null){
            return(
              <Sidebar courses={this.state.courses}/>
          );
        }
        else{
            return <h4>No courses</h4>
        }
      }
    else{return (
      <div>
        Home. Not Protected. Anyone can see this.
      </div>
    )}
  } 
}