import React, { Component } from 'react';
import {Button, Modal, FormControl, FormGroup, Radio, Label, Form, DropdownButton, MenuItem} from 'react-bootstrap';
import './editGoals.css'


export default class EditGoals extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleTimeClick = this.handleTimeClick.bind(this);
        this.handleDropdownClick = this.handleDropdownClick.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.state = {
            show: false,
            value: '',
            activeDropdownBtn: 'monthly',
            activeRadioBtn: 'hour',
        }
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    handleTimeClick(time) {
        this.setState({activeTimeBtn: time})
    }

    handleDropdownClick(time) {
        this.setState({activeDropdownBtn: time})
    }

    handleOptionChange(e) {
        this.setState({activeRadioBtn: e.target.value})
    }

    handleSave = (e) => {
        e.preventDefault(); //prevents default browser behaviour on click, whatever that means

        if(this.getValidationState() === 'success'){
            //TODO add to firebase
        }
        else {
            //TODO
        }
    };

    getValidationState(){
        console.log("val: ")
        console.log(this.state.value)
        const length = this.state.value.length;
        const reg = /^\d+(\.\d{1,1})?$/;
        if(reg.test(this.state.value)){
            return 'success';
        }else if(length > 0){
            return 'error';
        }
    }


    render() {
        console.log(this.state.activeBtn);
        let close = () => this.setState({show: false});

        return (
            <div className="editBtn" style={{height: 250}}>
                <Button bsStyle="primary" bsSize="large" onClick={() => this.setState({show: true})}>
                    Edit goals
                </Button>
                <Modal className="modal" show={this.state.show} onHide={close} container={this}>
                    <Modal.Header closeButton>
                        <Form inline>
                            <FormGroup className="validation-form">
                                <Label>Enter</Label>
                                {' '}
                            </FormGroup>
                            {' '}
                            <FormGroup>
                                <DropdownButton title={this.state.activeDropdownBtn} id={'dropdown-basic'}>
                                    <MenuItem onClick={() => this.handleDropdownClick('monthly')}>monthly</MenuItem>
                                    <MenuItem onClick={() => this.handleDropdownClick('weekly')}>weekly</MenuItem>
                                    <MenuItem onClick={() => this.handleDropdownClick('daily')}>daily</MenuItem>
                                </DropdownButton>
                                {' '}
                                <Label> goal:</Label>
                            </FormGroup>
                            {' '}
                        </Form>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="enter-form">
                            <FormGroup validationState={this.getValidationState()} controlId="formBasicText">
                                <div>
                                    <FormControl className="textField"
                                                 componentClass="input"
                                                 type="text"
                                                 placeholder="Teacher recommendation goes here..."
                                                 value={this.state.value}
                                                 onChange={this.handleChange}
                                    />
                                </div>
                                <FormControl.Feedback />
                                <Radio inline className="radio-inline" value="hour" onChange={this.handleOptionChange}
                                       checked={this.state.activeRadioBtn === 'hour'}>
                                    Hours
                                </Radio >
                                {' '}
                                <Radio inline className="radio-inline" value="min" onChange={this.handleOptionChange}
                                       checked={this.state.activeRadioBtn === 'min'}>
                                    Minutes
                                </Radio>
                                {' '}
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <div>
                            <Button active onClick={this.handleSave}>Save</Button>
                            <Button onClick={close}>Close</Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

    .label {
    background: white;
    color: #000;
    font-size: 18px;
    font-style: normal;
    font-weight: bold;

}

.radio-inline {
    font-size: 18px;
    width:4em;
    height:4em;
    padding-top: 20px;
    padding-right: 5px;
}

.enter-form {
    height: 80px;
}

