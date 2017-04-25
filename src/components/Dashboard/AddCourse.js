import React, { Component } from 'react'
import { saveCourse } from '../../helpers/auth'
import {FormGroup, FormControl, Button, HelpBlock} from 'react-bootstrap'
import FeedbackMessage from '../FeedbackMessage'


const styles = {
    AddCourse: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: '10px',
    }
};

/*      Component for adding course

Returns a form and a button.
Saves form data in firebase upon button click.

*/


export default class AddCourse extends Component{
    constructor(props){

        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            value: '',
        }
    }

    //get intialstate of form component. 
    getInitialState(){
        return {
            value: '',
            
        }
    }


    //handle change in form value. Sets the state value to form input value
    handleChange(e){
        this.setState({value: e.target.value.toUpperCase()});
        
        
    }

    //function for handling keypress
    handleKeyPress(e){
        if(e.key === 'Enter'){
            e.preventDefault();
            e.stopPropagation();
            this.handleAdd(e);
        }
    }

    //function for validating input. 
    getValidationState(){
        var length = this.state.value.length;
        var re = /^[A-Z]{2,3}[0-9]{4}$/; //2 or 3 capital letters followed by 4 digits

        if(re.test(this.state.value)){
            return 'success';
        }else if(length > 0){
            return 'error';
        }
    }

    //function for handling click on add-button. Only saves course to database if input is valid.
    handleAdd(e){
        e.preventDefault();

        if(this.getValidationState() === 'success'){
            saveCourse(this.state.value); //saveCourse(course) adds course to currently logged in user in Firebase
            this.setState({ //reset value to empty string, display feedbackmessage
                displayFeedbackMessage: true,
                feedbackMessage: this.state.value + " has been added to your courses!",
                bsStyle: 'success',
                value: '',
            }); 
        }
        else{
            console.log("Error: Tried submitting invalid value: " + this.state.value);
            this.setState({
                displayFeedbackMessage: true,
                feedbackMessage: this.state.value + " is not a valid course.",
                bsStyle: 'warning',
            }); 
            
        }
    }

    handleAddToMyCourses(course,e){
        e.preventDefault();
        //add to users courses in firebase
        saveCourse(course);
        this.setState({
                    displayFeedbackMessage: true,
                    feedbackMessage: course + " has been added to your courses!",
                    bsStyle: 'success',
        });
    }

    

    //Renders a form and a button for submission
    render(){
        return(  
                <div> 
                    <div style={styles.AddCourse}>
                                <FormGroup controlId="addCourseForm" validationState={this.getValidationState()} >
                                    <FormControl 
                                    id="addCourseForm" 
                                    componentClass='input'
                                    value={this.state.value}
                                    type="text" 
                                    placeholder="Course name"
                                    onChange={this.handleChange}
                                    onKeyPress={this.handleKeyPress}
                                    
                                    />
                                    <FormControl.Feedback/>
                                    <HelpBlock>Enter course code (up to three letters followed by four digits)</HelpBlock>
                                </FormGroup>
                        <Button type="submit" bsStyle="primary" bsSize="large" onClick={this.handleAdd}>Add</Button>
                    </div>
                    <FeedbackMessage active={this.state.displayFeedbackMessage} message={this.state.feedbackMessage} bsStyle={this.state.bsStyle}/>
                </div>
        )
    } 


}