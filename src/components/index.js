import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Dashboard from './protected/Dashboard'
import Courses from './protected/Courses'
import { logout,loadCourse } from '../helpers/auth'
import { firebaseAuth } from '../config/constants'
import {Navbar,NavItem, Nav} from 'react-bootstrap'
function MatchWhenAuthed ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
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
    loading: true,
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      this.emner = loadCourse();
      console.log("ting"+this.emner);
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
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <Router>
          <div>

            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                  <Navbar.Brand>
                  <Link to="/" className="navbar-brand">PST</Link>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                  </Navbar.Header>
                  <Navbar.Collapse>
                    <Nav pullRight>
                    <NavItem><Link to="/" className="navbar-link">Home</Link></NavItem>
                    <NavItem><Link to="/Courses" className="navbar-link">Courses</Link></NavItem>
                    <NavItem><Link to="/dashboard" className="navbar-link">Dashboard</Link></NavItem>
                    {this.state.authed //Velger om man skal vise logout eller login og register
                      ? <NavItem><button
                          style={{border: 'none', background: 'transparent'}}
                          onClick={() => {
                            logout()
                            this.setState({authed: false})
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
                  <Route exact path='/'  component={Home} />
                  <MatchWhenUnauthed authed={this.state.authed} path='/login' component={Login} />
                  <MatchWhenUnauthed authed={this.state.authed} path='/register' component={Register} />
                  <MatchWhenAuthed authed={this.state.authed} path='/dashboard' component={Dashboard} />
                  <MatchWhenAuthed authed={this.state.authed} path='/Courses' component={Courses} />
                  <Route render={() => <h3>No Match</h3>} />
                </Switch>
              </div>
            </div>
          </div>
      </Router>
    );
  }
}