import React, { Component } from 'react'
import { auth, privilige } from '../../helpers/auth'

export default class Register extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    if(this.pw.value === this.pwcon.value){
        (auth(this.email.value, this.pw.value)).then( (user)=>  privilige(user, this.state.authUser)).catch( error => console.log("errorgreier" + error.message))
    }
  
  else{
    console.log("hehe");
    this.setState({error: "Password did not match"})
    }
  };
  constructor(props){
    super(props);
    this.state={
        error:"",
      authUser:10
    }
    this.handleOptionChange= this.handleOptionChange.bind(this)
  }

  handleOptionChange(changeEvent){
    this.setState({
      authUser: changeEvent.target.value})
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
            <div className="form-group">
            <div className="radio">
              <label>
                <input type="radio" value={10}
                       checked={this.state.authUser == 10}
                       onChange={this.handleOptionChange} />
                Student
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value={99}
                       checked={this.state.authUser == 99}
                       onChange={this.handleOptionChange} />
                Professor
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Register</button>

        </form>
          <label>{this.state.error}</label>
      </div>
    )
  }
}