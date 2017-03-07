import React, { Component } from 'react'
import { saveCourse } from '../../helpers/auth'
import {FormGroup, FormControl, Button, HelpBlock} from 'react-bootstrap'
import './AddCourse.css'

/*      Component for adding course

Returns a form and a button.
Saves form data in firebase upon button click.
Should be updated to include better form validation. User should probably only be able to add courses that are already in database.

//https://react-bootstrap.github.io/components.html#forms

TODO

- prevent adding an already existing course from replacing previous course
- make it possible to submit form by pressing enter

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
        this.setState({value: e.target.value.toUpperCase()});
        
    }

    //function for handling keypress
    handleKeyPress(e){
        if(e.key === 'Enter'){
            this.handleAdd();
        }
    }

    //function for validating input. For now returns error if form has input of length greater than 0 but less than 5, and success for anything of length > 4
    getValidationState(){
        var length = this.state.value.length;
        var re = /^[A-Z]{2,3}[0-9]{4}$/

        if(re.test(this.state.value)){
            return 'success';
        }else if(length > 0){
            return 'error';
        }
    }

    //function for handling click on add-button. Only saves course to database if input is valid.
    handleAdd = (e) => {
		e.preventDefault(); //prevents default browser behaviour on click, whatever that means

        if(this.getValidationState() === 'success'){
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
            <div className="FormWrapper" >
                    <form>
                        <FormGroup controlId="addCourseForm" validationState={this.getValidationState()}>
                            <FormControl 
                            id="addCourseForm" 
                            componentClass='input'
                            value={this.state.value}
                            className="InputForm" 
                            type="text" 
                            placeholder="Course name"
                            onChange={this.handleChange}
                            />
                            <FormControl.Feedback/>
                            <HelpBlock>Enter course code (up to three letters followed by four digits)</HelpBlock>
                        </FormGroup>
                    </form>
                    <Button className="AddCourse-addBtn "type='submit' bsStyle="primary" bsSize="large" onClick={this.handleAdd} style={{marginLeft: "20px"}}>Add</Button>
            </div>
        )
    } 


}