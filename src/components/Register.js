import React, { Component } from 'react'
import { auth } from '../helpers/auth'

export default class Register extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    if(this.pw.value === this.pwcon.value){
      auth(this.email.value, this.pw.value)}
  
  else{
    console.log("hehe")
    this.error = "Password did not match"}
    this.setState({})
  }

  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" placeholder="Confirm Password" ref={(pwcon) => this.pwcon = pwcon}/>
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        <label>{this.error}</label>
        </form>
      </div>
    )
  }
}