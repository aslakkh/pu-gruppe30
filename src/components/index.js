import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import Login from './Login/Login'
import Register from './Register/Register'
import Home from './Home/Home'
import Dashboard from './Dashboard/Dashboard'
import ProfessorDashboard from './Dashboard/ProfessorDashboard'
import SessionPlanner from './SessionPlanner/SessionPlanner'
import { logout,} from '../helpers/auth'
import { firebaseAuth } from '../config/constants'
import {Navbar,NavItem, Nav} from 'react-bootstrap'
import firebase from 'firebase';
import ProfessorHome from './ProfessorHome/ProfessorHome'
import './index.css'
function MatchWhenAuthed ({component: Component, authed, courses, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component courses={courses}/>
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}


function MatchWhenUnauthed ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}


export default class App extends Component {
  state = {
    authed: false,
    loading: true

  };
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.useruid = user.uid;
          let that = this;
        console.log(user);
          firebase.database().ref().child('users/'+ this.useruid+'/info/privilege').once('value').then(function(snapshot){
              if(snapshot.val() === "99"){
                  that.setState({
                      admin:true
                  })
              }else{
                  that.setState({
                      admin:false
                  })
              }
          });
        this.setState({
          authed: true,
          loading: false,
          user : this.useruid
        });

        let courseRef = firebase.database().ref();
        courseRef.child('users/'+this.useruid+'/courses').orderByChild('active').equalTo(true).on('value', snap => {
          that.setState({
            courses: snap.val()
          });
          firebase.database().ref().child('courses').on('value', snap => {
            console.log(snap.val())

          })
          

        })



        


      } else {
        this.setState({
          loading: false
        })
      }
    })
    
  }
  componentWillUnmount () {
    this.removeListener()
  }

  homeDecide(){
      if(this.state.admin === true){
          return (<ProfessorHome courses={this.state.courses}/>)
      }
      else{
          return(
              <Home courses={this.state.courses} authed={this.state.authed} admin={this.state.admin}/>
          )
      }
  }

  dashboardDecide(){
    if(this.state.admin === true){
      return (<ProfessorDashboard courses={this.state.courses}/>)
    }
    else{
      return (<Dashboard courses={this.state.courses}/>);
    }
  }

  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <Router>
          <div>

            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                  <Navbar.Brand>
                  <Link to="/" className="navbar-brand"><img alt="Logo" src="https://firebasestorage.googleapis.com/v0/b/pu-gruppe30.appspot.com/o/logo2.png?alt=media&token=79e5f90c-1bd3-417b-b5a7-af3289315987"/></Link>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                  </Navbar.Header>
                  <Navbar.Collapse>
                    <Nav pullRight>
                    <NavItem><Link to="/" className="navbar-link">Home</Link></NavItem>
                    <NavItem><Link to="/dashboard" className="navbar-link">Dashboard</Link></NavItem>
                    {this.state.authed //Velger om man skal vise logout eller login og register
                      ? <NavItem><button
                          style={{border: 'none', background: 'transparent'}}
                          onClick={() => {
                            logout();
                            this.setState({authed: false});
                            Router.transitionTo('/')
                          }}
                          className="navbar-link"><span className="glyphicon glyphicon-log-out"></span> Logout</button></NavItem>
                      :<Nav >
                          <NavItem><Link  to="/login" className="navbar-link"><span className="glyphicon glyphicon-log-in"></span> Login</Link></NavItem>
                          <NavItem><Link to="/register" className="navbar-link"><span className="glyphicon glyphicon-user"></span> Register</Link></NavItem>
                        </Nav>}
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
            <div className="container">
              <div className="row">
                <Switch>
                    <Route exact path='/'  component={() => this.state.authed ? this.homeDecide() : <Login/>}/>
                  <MatchWhenUnauthed authed={this.state.authed} path='/login' component={Login} />
                  <MatchWhenUnauthed authed={this.state.authed} path='/register' component={Register} />
                  <MatchWhenAuthed authed={this.state.authed} path='/dashboard' component={() => this.dashboardDecide()}/>
                  <MatchWhenAuthed authed={this.state.authed} path='/SessionPlanner' component={SessionPlanner} courses={this.state.courses}/>
                  <Route render={() => <h3>No Match</h3>} />
                </Switch>
              </div>
            </div>
          </div>
      </Router>
    );
  }
}