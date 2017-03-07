import React, { Component } from 'react'
import {FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import { planSession } from '../../helpers/auth'
import './SessionPlanner.css'

var DatePicker = require("react-bootstrap-date-picker");

export default class SessionPlanner extends Component{

    constructor(props){
        super(props);
        this.getInitialState = this.getInitialState.bind(this);
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

    getInitialState(){
        var d = new Date(new Date().getTime() + (24*60*60*1000)).toISOString();
        return{
            date: d
        }
    }

    handleDateChange(e){
        //let temp = new Date(e);
        //console.log(temp);
        this.setState({
            date: e
        });
    }

    handleGoalChange(e){
        this.setState({
            goal: e.target.value,
        });
    }

    handleClick(e){
        let d = new Date(this.state.date);
        if(this.validateState()){
            
            planSession(this.state.course, d.getTime(), this.state.goal);
        }
        else{
            console.log("Error: tried submitting invalid values");
        }
        
    }

    validateState(){
        //validate that date is after today
        //validate that goal is not empty
        let today = new Date(new Date);
        let stateDate = new Date(this.state.date);
        stateDate.setHours(0,0,0,0);
        return(stateDate.getTime() >= today.getTime() && this.state.goal.trim() !== "")
    }

    componentDidMount(){
        console.log(this.state.course);
    }


    render(){
        //<DatePicker defaultValue={this.state.date}/>
        return(
            <div>
                <h4>SessionPlanner is working</h4>
                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Goal/Description</ControlLabel>
                    <FormControl 
                    componentClass="textarea" 
                    placeholder="Write what you plan to do here."
                    type="text" 
                    value={this.state.goal}
                    onChange={this.handleGoalChange}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Date</ControlLabel>
                    <DatePicker id="example-datepicker" value={this.state.date} onChange={this.handleDateChange}/>
                </FormGroup>
                <Button
                type = 'submit'
                bsStyle='primary'
                bsSize='large'
                onClick={this.handleClick}
                >
                Plan this session</Button>
            </div>
        );
        
    }
}