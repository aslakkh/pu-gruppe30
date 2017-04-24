import React, { Component } from 'react'
import Sidebar from './Sidebar'

export default class Courses extends Component {
constructor(props) {
  super(props);
  this.state=({
    courses: this.props.courses,
    emner: ["tma","bull"]
  })
};


componentWillReceiveProps(nextProps){
  console.log("willReceiveProps: ");
  console.log(nextProps.courses);
  this.setState({
    courses: nextProps.courses
  });
}


componentWillMount(){
    
  

}

componentDidMount(){
  
}
	render (){
/*        if(!this.state.done) {
        return (<div className="chatapp">Loading...</div>);
    }*/
		return (
			<Sidebar courses={this.state.courses}/>
        )
	}




}