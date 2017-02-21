import React, { Component } from 'react'
import { saveCourse,getCourse } from '../../helpers/auth'
import {FormGroup, FormControl, Button, HelpBlock} from 'react-bootstrap'
import './AddCourse.css'

/*      Component for adding course

Returns a form and a button.
Saves form data in firebase upon button click.
Should be updated to include better form validation. User should probably only be able to add courses that are already in database.

//https://react-bootstrap.github.io/components.html#forms

*/


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

    //function for validating input. For now returns error if form has input of length greater than 0 but less than 5, and success for anything of length > 4
    getValidationState(){
        const length = this.state.value.length;
        if(length > 4){
            return 'success';
        }else if(length > 0){
            return 'error';
        }
    }

    //function for handling click on add-button. Only saves course to database if input is valid.
    handleAdd = (e) => {
		e.preventDefault(); //prevents default browser behaviour on click, whatever that means

        if(this.getValidationState() == 'success'){
            saveCourse(this.state.value); //saveCourse(course) adds course to currently logged in user in Firebase
            this.setState({value: ''}); //resets value to empty string
        }
        else{
            console.log("Error: Tried submitting invalid value: " + this.state.value);
        }
		//getCourse();
	}

    //Renders a form and a button for submission
    render(){
        return(
            <div className="AddCourse">
                <div className="Form">
                    <form>
                        <FormGroup controlId="addCourseForm" validationState={this.getValidationState()}>
                            <FormControl 
                            id="addCourseForm" value={this.state.value} 
                            type="text" 
                            placeholder="Course name"
                            onChange={this.handleChange}
                            style={{width: "400px"}}
                            />
                            <FormControl.Feedback/>
                            <HelpBlock>Enter a course (must have at least 5 characters)</HelpBlock>
                        </FormGroup>
                    </form>
                    <Button bsStyle="primary" bsSize="large" onClick={this.handleAdd}>legg til emne</Button>
                </div>
            </div>
        )
    } 


}