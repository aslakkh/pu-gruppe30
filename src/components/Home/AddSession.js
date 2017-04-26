/**

 * Created by KasperKBerg on 28.03.2017.
 */

import React, { Component } from 'react';
import {Button, Modal, FormGroup, Label, Form, DropdownButton, MenuItem,ControlLabel} from 'react-bootstrap';
import { addSession} from '../../helpers/auth'
import FeedbackMessage from '../FeedbackMessage'
/*
    Add an old session
 */

const styles = {
    Feedback: {
        marginTop: '10px',
    },
    timeLabel: {
        background: 'white',
        color: '#000',
        fontSize: '18px',
        fontStyle: 'normal',
        fontWeight: 'normal'
    }
};

let DatePicker = require("react-bootstrap-date-picker");
export default class AddSession extends Component{
    constructor(props){
        super(props);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleGoalChange = this.handleGoalChange.bind(this);

        this.handleDropdownClick = this.handleDropdownClick.bind(this);
        this.validateState = this.validateState.bind(this);
        this.setHours = this.setHours.bind(this);
        this.setMinutes = this.setMinutes.bind(this);
        this.state = {
            courseID: this.props.courseID,
            date: new Date(new Date().getTime()).toISOString(),
            show: false,
            hourSelected: '0',
            minSelected: '0',
            secondsPlanned: '0',
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            courseID: nextProps.courseID,
        })
    }

    handleDropdownClick(time) {
        this.setState({activeDropdownBtn: time})
    }

    setHours(num) {
        num !== 0 ? this.setState({hourSelected: num}) : this.setState({hourSelected : '0'});

    }

    setMinutes(num) {
        num !== 0 ? this.setState({minSelected: num}) : this.setState({minSelected : '0'});
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


    handleSave(e){
        e.preventDefault(); //prevents default browser behaviour on click, whatever that means

        if(this.datePickerValidateState() === 'success'){
            if(this.state.hourSelected === 0 && this.state.minSelected === 0){

                this.setState({ //display negative feedbackmessage
                    show: false,
                    displayFeedbackMessage: true,
                    feedbackMessage: "Session not saved: Can not add previous session of 0 hours and 0 minutes.",
                    bsStyle: 'danger',
                });
            }
            else{ //save and display positive feedbackmessage
                var d = new Date(this.state.date);
                var message = "Saved " + this.state.hourSelected + " hours, " + this.state.minSelected + " minutes " + " on " + d.toDateString();
                this.setState({
                    show: false,
                    displayFeedbackMessage: true,
                    feedbackMessage: message,
                    bsStyle: 'success',
                });

                addSession(this.state.date,this.state.courseID,this.state.minSelected,this.state.hourSelected);
            }
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

    //Populates hours and minutes-dropdowns
    getView() {
        let items = [];
        items.push(<Label style={styles.timeLabel} key={3}>Hours:</Label>);
        items.push(<DropdownButton key={4} title={this.state.hourSelected} id={'dropdown-basic'} >{this.getMenuItems('hours')}</DropdownButton>);
        items.push(<Label style={styles.timeLabel} key={5}>Minutes:</Label>);
        items.push(<DropdownButton key={6} title={this.state.minSelected} id={'dropdown-basic'}>{this.getMenuItems('mins')}</DropdownButton>);

        return (
            <Form className="enter-form" inline>
                {items}
            </Form>
        )
    }

    //helper method for getView
    getMenuItems(box) {
        let items = [];
        if (box==='hours') {
            for(let i=0; i<13; i++) {
                items.push(<MenuItem onClick={() => this.setHours(i)} key={i}>{i}</MenuItem>);
            }
        }
        if (box==='mins') {
            for(let i=0; i<60; i+=15) {
                items.push(<MenuItem onClick={() => this.setMinutes(i)} key={i}>{i}</MenuItem>);
            }
        }
        return items;
    }




    render() {
        let close = () => this.setState({show: false});

        return (
            <div className="main">
                <h4>Forgot to start timer?</h4>
                <Button bsStyle="primary" bsSize="large" onClick={() => this.setState({show: true})}>
                    Set previous session
                </Button>

                <FeedbackMessage active={this.state.displayFeedbackMessage} message={this.state.feedbackMessage} bsStyle={this.state.bsStyle} style={styles.Feedback}/>

                <Modal className="modal" show={this.state.show} onHide={close} container={this}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup
                            controlId="datePicker"

                            validationState={this.datePickerValidateState()}>
                            <ControlLabel>Date</ControlLabel>
                            <DatePicker id="example-datepicker" value={this.state.date} onChange={this.handleDateChange}/>
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Body>
                        {this.getView()}

                    </Modal.Body>
                    <Modal.Footer>
                        <div>
                            <Button onClick={(e) => this.handleSave(e)}>Save</Button>
                            <Button onClick={close}>Close</Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}