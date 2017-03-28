/**
 * Created by jan on 26/03/2017.
 */
import React, { Component } from 'react';
import {Button, Modal, FormGroup, Label, Form, DropdownButton, MenuItem,ControlLabel} from 'react-bootstrap';


let DatePicker = require("react-bootstrap-date-picker");
export default class AddSession extends Component{
    constructor(props){
        super(props);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleGoalChange = this.handleGoalChange.bind(this);
        this.validateState = this.validateState.bind(this);
        this.state = {
            date: new Date(new Date().getTime() + (24*60*60*1000)).toISOString(),
            show: false
        }
    }
    validateState(){
        //validates that date is after today
        //validates that goal is not empty
        let today = new Date(new Date);
        let stateDate = new Date(this.state.date);
        stateDate.setHours(0,0,0,0);
        return(stateDate.getTime() <= today.getTime() && this.state.goal.trim() !== "")
    }
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



    formValidateState(){

        if(this.state.goal.trim() !== ""){
            return 'success';
        }
        else{
            return 'error';
        }
    }

    datePickerValidateState(){
        let stateDate = new Date(this.state.date);
        stateDate.setHours(0,0,0,0);
        if(stateDate.getTime() <= Date.now()){
            return 'success';
        }
        else{
            return 'error';
        }
    }







    render() {
        let close = () => this.setState({show: false});

        return (
            <div className="main" style={{marginBottom: 10}}>
                <Button bsStyle="primary" bsSize="large" onClick={() => this.setState({show: true})}>
                    After Registrer a Session
                </Button>
                <Modal className="modal" show={this.state.show} onHide={close} container={this}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup
                            controlId="datePicker"
                            validationState={this.datePickerValidateState()}
                        >
                            <ControlLabel>Date</ControlLabel>
                            <DatePicker id="example-datepicker" value={this.state.date} onChange={this.handleDateChange}/>
                        </FormGroup>
                        <Label className="help-label">1 day is considered 8 working hours</Label>
                    </Modal.Body>
                    <Modal.Footer>
                        <div>
                            <Button onClick={this.handleSave}>Save</Button>
                            <Button onClick={close}>Close</Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}