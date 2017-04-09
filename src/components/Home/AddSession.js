/**

 * Created by KasperKBerg on 28.03.2017.
 */

import React, { Component } from 'react';
import {Button, Modal, FormGroup, Label, Form, DropdownButton, MenuItem,ControlLabel} from 'react-bootstrap';
import { saveGoal } from '../../helpers/auth'
import {ref } from '../../config/constants'
import firebase from 'firebase';



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
            date: new Date(new Date().getTime() + (24*60*60*1000)).toISOString(),
            show: false,
            hourSelected: 0,
            minSelected: 0,
            secondsPlanned: 0,
        }
    }

    handleDropdownClick(time) {
        this.setState({activeDropdownBtn: time})
    }

    setHours(num) {
        this.setState({
            hourSelected: num
        })
    }

    setMinutes(num) {
        this.setState({
            minSelected: num
        })
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


    handleSave = (e) => {
        e.preventDefault(); //prevents default browser behaviour on click, whatever that means
        this.setState({secondsPlanned: (this.state.minSelected * 60) + (this.state.hourSelected * 3600)});
        //saveGoal(this.state.courseID, seconds);
        this.setState({
            show:false
        })

        this.castToFirebase();

    }


    castToFirebase(){
        const userUid = firebase.auth().currentUser.uid;
        const variabel = new Date(this.state.date)
        variabel.setMilliseconds(Math.random()*1000)
        const timeRef = ref.child('users/'+userUid+'/courses/'+this.state.courseID+'/sessions/'+ variabel.getTime());
        timeRef.set({time:(this.state.minSelected * 60) + (this.state.hourSelected * 3600),desc: "secondsPlanned"});
        this.setState({
            secondsPlanned: 0
        })
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


    getView() {
        let items = [];
        items.push(<Label key={3}>Hours:</Label>);
        items.push(<DropdownButton key={4} title={this.state.hourSelected} id={'dropdown-basic'} >{this.getMenuItems('hours')}</DropdownButton>);
        items.push(<Label key={5}>Minutes:</Label>);
        items.push(<DropdownButton key={6} title={this.state.minSelected} id={'dropdown-basic'}>{this.getMenuItems('mins')}</DropdownButton>);

        return (
            <Form className="enter-form" inline>
                {items}
            </Form>
        )
    }


    getMenuItems(box) {
        let items = [];
        let max = 0;
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
            <div className="main" style={{marginBottom: 10}}>
                <Button bsStyle="primary" bsSize="large" onClick={() => this.setState({show: true})}>
                    Set previous session
                </Button>
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
                            <Button onClick={this.handleSave}>Save</Button>
                            <Button onClick={close}>Close</Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}