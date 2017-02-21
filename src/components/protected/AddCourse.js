import React, { Component } from 'react'
import { saveCourse,getCourse } from '../../helpers/auth'
import {FormGroup, FormControl} from 'react-bootstrap'

//Component for adding AddCourse
//https://react-bootstrap.github.io/components.html#forms

export default class AddCourse extends Component{
    constructor(props){
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: ''
        }
    }

    //get intialstate of form component. 
    getInitialState(){
        return {
            value: ''
        }
    }

    //handle change in form value. Sets the state value to form input value
    handleChange(e){
        this.setState({value: e.target.value});
    }

    //function for validating input. Allows anything over 4 characters for now
    getValidationState(){
        const length = this.state.value.length;
        return (length > 4) ? 'success' : 'error'; //validates input greater than 4 characters
    }

    //function for handling click on add-button
    handleAdd = (e) => {
		e.preventDefault(); //prevents default browser behaviour on click, whatever that means
		saveCourse(this.state.value); //saveCourse(course) adds course to user in Firebase
		//getCourse();
	}

    //Renders a form and a button for submission
    render(){
        return(
            <div className="AddCourse">
                <div className="Form">
                    <form>
                        <FormGroup controlId="1" bsSize="small" style={{width: "50%"}}>
                            <FormControl 
                            id="1" value={this.state.value} 
                            type="text" 
                            placeholder="Course name"
                            onChange={this.handleChange}
                            />
                        </FormGroup>
                    </form>
                    <button className="btn btn-primary btn-lg" onClick={this.handleAdd}>legg til emne</button>
                </div>
            </div>
        )
    } 


}