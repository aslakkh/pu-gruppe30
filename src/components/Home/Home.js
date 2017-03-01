import React, { Component } from 'react'
export default class Home extends Component {
  constructor(props){
    super(props);
    console.log("Home got: ");
    console.log(this.props.courses);
    this.state=({
        courses: this.props.courses,
        authed: this.props.authed
    })
  };
  componentWillReceiveProps(nextProps){
      console.log("Home Receives: ");
      console.log(nextProps.courses);
      this.setState({
          courses: nextProps.courses,
          authed: nextProps.authed
      });
  }

  render () {
      if(this.state.authed){
          return(
            <div>authed</div>
          )
      }


    else{return (
      <div>
        Home. Not Protected. Anyone can see this.
      </div>
    )}
  } 
}