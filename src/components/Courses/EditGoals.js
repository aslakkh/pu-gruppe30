import React, { Component } from 'react';
import {Button, Modal, FormGroup, Label, Form, DropdownButton, MenuItem} from 'react-bootstrap';
import './editGoals.css'
import { saveGoal } from '../../helpers/auth'
import { getGoal } from '../../helpers/auth'




export default class EditGoals extends React.Component {

    constructor(props) {
        super(props);
        this.handleDropdownClick = this.handleDropdownClick.bind(this);
        this.setDays = this.setDays.bind(this);
        this.setHours = this.setHours.bind(this);
        this.setMinutes = this.setMinutes.bind(this);

        this.state = {
            courseID: this.props.courseID,
            show: false,
            activeDropdownBtn: 'monthly',
            daySelected: '0',
            hourSelected: '0',
            minSelected: '0',
            goalInSeconds: '0'
        }
    }

    handleDropdownClick(time) {
        this.setState({activeDropdownBtn: time})
    }

    setDays(num) {
        this.setState({
            daySelected: num
        })
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

    handleSave = (e) => {
        e.preventDefault(); //prevents default browser behaviour on click, whatever that means
        let seconds = 0;
        if (this.state.activeDropdownBtn === 'monthly') {
             seconds = (parseInt(this.state.minSelected) * 60) + (parseInt(this.state.hourSelected) * 3600) + (parseInt(this.state.daySelected) * 8 * 3600);
        } else if (this.state.activeDropdownBtn ==='weekly') {
            seconds = (4 * parseInt(this.state.minSelected) * 60) + (parseInt(this.state.hourSelected) * 3600) + (parseInt(this.state.daySelected) * 8 * 3600);
        } else if (this.state.activeDropdownBtn ==='daily') {
            seconds = (20 * parseInt(this.state.minSelected) * 60) + (parseInt(this.state.daySelected) * 8 * 3600);
        }
        if (seconds > 0) {
            this.setState({goalInSeconds: seconds});
            saveGoal(this.state.courseID, seconds);
            this.setState({
                show:false
            })
        }

    };

    getView() {
        let items = [];
        if (this.state.activeDropdownBtn==='monthly' || this.state.activeDropdownBtn==='weekly') {
            items.push(<Label key={1}>Days:</Label>);
            items.push(<DropdownButton key={2} title={this.state.daySelected} id={'dropdown-basic'}>{this.getMenuItems('days')}</DropdownButton>);
        }
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
        (this.state.activeDropdownBtn==='monthly') ? max=21 : (this.state.activeDropdownBtn==='weekly') ? max = 8 : 0;
        if (box==='days') {
            for(let i=0; i<max; i++) {
                items.push(<MenuItem onClick={() => this.setDays(i)} key={i}>{i}</MenuItem>);
            }
        }
        if (box==='hours') {
            for(let i=0; i<9; i++) {
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
            <div className="main" style={{height: 250}}>
                <Button bsStyle="primary" bsSize="large" onClick={() => this.setState({show: true})}>
                    Edit goals
                </Button>
                <Modal className="modal" show={this.state.show} onHide={close} container={this}>
                    <Modal.Header closeButton>
                        <Form inline>
                            <FormGroup className="validation-form">
                                <Label className="bold">{this.state.courseID}</Label>
                                <Label>Enter</Label>
                            </FormGroup>
                            <FormGroup>
                                <DropdownButton title={this.state.activeDropdownBtn} id={'dropdown-basic'}>
                                    <MenuItem onClick={() => this.handleDropdownClick('monthly')}>monthly</MenuItem>
                                    <MenuItem onClick={() => this.handleDropdownClick('weekly')}>weekly</MenuItem>
                                    <MenuItem onClick={() => this.handleDropdownClick('daily')}>daily</MenuItem>
                                </DropdownButton>
                                <Label> goal:</Label>
                            </FormGroup>
                        </Form>
                    </Modal.Header>
                    <Modal.Body>
                        {this.getView()}
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