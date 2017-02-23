import React, { Component } from 'react'
import Sidebar from './protected/Sidebar'
export default class Home extends Component {
  render () {
    return (
      <div>
      <Sidebar/>
        Home. Not Protected. Anyone can see this.
      </div>
    )
  } 
}