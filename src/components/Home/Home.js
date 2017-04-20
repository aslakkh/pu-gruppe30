import React, { Component } from 'react'
import Sidebar from './Sidebar'
export default class Home extends Component {
  constructor(props){
    super(props);
    console.log("Home got: ");
    console.log(this.props.courses);
    this.state=({
        courses: this.props.courses,
        authed: this.props.authed,
        admin: this.props.admin
    })
  };
  componentWillReceiveProps(nextProps){
      console.log("Home Receives: ");
      console.log(nextProps.courses);
      this.setState({
          courses: nextProps.courses,
          authed: nextProps.authed,
          admin: nextProps.admin
      });
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