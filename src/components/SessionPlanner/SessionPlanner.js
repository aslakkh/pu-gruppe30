import React, { Component } from 'react'
import {FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import { planSession } from '../../helpers/auth'
import './SessionPlanner.css'

/*
TODO:
- prevent from moving back to homepage on submit
- Add better feedback to user (about validation state)

*/

var DatePicker = require("react-bootstrap-date-picker");

export default class SessionPlanner extends Component{

    constructor(props){
        super(props);
        //this.getInitialState = this.getInitialState.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleGoalChange = this.handleGoalChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.validateState = this.validateState.bind(this);
        this.state = {
            date: new Date(new Date().getTime() + (24*60*60*1000)).toISOString(),
            goal: "",
            course: this.props.course,
        }
    }

    /*
    getInitialState(){
        var d = new Date(new Date().getTime() + (24*60*60*1000)).toISOString();
        return{
            date: d
        }
    }*/

    //handler for change in datepicker. Sets state.date to the ISO-string provided by datepicker
    handleDateChange(e){
        
        this.setState({
            date: e,
        });
    }

    //handler for change in text area
    handleGoalChange(e){
        this.setState({
            goal: e.target.value,
        });
    }

    //handles click on submit button
    handleClick(e){
        e.preventDefault(); //prevent default HTML-action on submitting a form
        let d = new Date(this.state.date); //creates a date object from the ISO-string provided by datepicker
        if(this.validateState()){
            //sets the time of the date sent to firebase to system time
            //so that every planned session gets a unique key (in ms)
            let today = new Date();
            d.setHours(today.getHours(), today.getMinutes(), today.getSeconds(), today.getMilliseconds());
            planSession(this.state.course, d.getTime(), this.state.goal);
        }
        else{
            //TODO: provide better user feedback
            console.log("Error: tried submitting invalid values");
        }
        
    }

    validateState(){
        //validates that date is after today
        //validates that goal is not empty
        let today = new Date(new Date);
        let stateDate = new Date(this.state.date);
        stateDate.setHours(0,0,0,0);
        return(stateDate.getTime() >= today.getTime() && this.state.goal.trim() !== "")
    }

    componentDidMount(){
        //console.log(this.state.course);
    }


    //Component renders a Formgroup containing a textarea and a datepicker, and a button for submitting data
    render(){
        //<DatePicker defaultValue={this.state.date}/>
        return(
            <div>
                <FormGroup 
                controlId="planSessionForm"
                >
                    <ControlLabel>Goal/Description</ControlLabel>
                    <FormControl 
                    componentClass="textarea" 
                    placeholder="Write what you plan to do here."
                    type="text" 
                    value={this.state.goal}
                    onChange={this.handleGoalChange}
                    />
                    <ControlLabel>Date</ControlLabel>
                    <DatePicker id="example-datepicker" value={this.state.date} onChange={this.handleDateChange}/>
                </FormGroup>
                <Button
                bsStyle='primary'
                bsSize='large'
                onClick={this.handleClick}
                >
                Plan this session</Button>
            </div>
        );
        
    }
}