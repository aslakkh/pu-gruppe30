import React, { Component } from 'react'
import { saveCourse,getCourse } from '../../helpers/auth'
import {Forms, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'

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

    //get intialstate of form component
    getInitialState(){
        return {
            value: ''
        }
    }

    //handle change in form value
    handleChange(e){
        this.setState({value: e.target.value});
        console.log(this.state.value);
    }

    //function for validating 
    getValidationState(){
        return 'success';
    }

    //fuction for handling click on add-button
    handleAdd = (e) => {
		e.preventDefault();
		saveCourse("TMA4245")
		console.log("hei")
		getCourse();
	}

    render(){
        return(
            <div className="AddCourse">
                <div className ="Form">
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
                    <button className="btn btn-primary btn-lg">legg til emne</button>
                </div>
            </div>
        )
    } 


}