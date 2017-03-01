import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Home from '../Home/Home'
import Dashboard from '../Dashboard/Dashboard'
import { logout } from '../../helpers/auth'
import { firebaseAuth } from '../../config/constants'
import {Navbar,NavItem, Nav} from 'react-bootstrap'

const navbarInstance = (

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
                    <NavItem><Link to="/dashboard" className="navbar-link">Dashboard</Link></NavItem>
                    {this.state.authed
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
                  <Route render={() => <h3>No Match</h3>} />
                </Switch>
              </div>
            </div>
          </div>
      </Router>);


export default navbarInstance;