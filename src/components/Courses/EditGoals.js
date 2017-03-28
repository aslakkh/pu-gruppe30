import React, { Component } from 'react';
import {Button, Modal, FormGroup, Label, Form, DropdownButton, MenuItem} from 'react-bootstrap';
import './editGoals.css'
import {getSec} from '../../helpers/auth';
import { saveGoal } from '../../helpers/auth'
import { ref } from '../../config/constants'
import { saveGoal2 } from '../../helpers/auth'

//TODO ENDRE TIMER FRA 8 TIL 12


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
            tr: '',
            teacherRecommendation: null
        }
    }

    componentWillMount(){
        let that = this;
        let coursesRef = ref.child("/courses/" + this.state.courseID + "/weekly");
        coursesRef.on("value", function(snapshot){
            that.setState({
                teacherRecommendation: snapshot.val(),
            });


        });
    }

    secondsToString(seconds) {
        /*
         returns short/long formatted string of seconds.
         */
        let out = [];
        let hours = Math.floor(seconds / (60 * 60));
        let remainder = seconds % (60 * 60);
        let minutes = Math.floor(remainder / 60);
        let sec = Math.floor(remainder - (minutes * 60));
        let long = "";
        if (hours != 0) {
            if (hours === 1) {
                long = hours + " hour"

            } else {
                long = hours + " hours"

            }
        }
        if (hours != 0 && minutes != 0) {
            long = long + " and ";
        }
        if (minutes != 0) {
            long = long + minutes + " minutes"
        }
        let short = hours + ":" + minutes + ":" + sec;
        out.push(short);
        out.push(long);
        return out;
    }


    componentDidMount() {

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

    getTeacherRecommendation(course) {

    }

    handleSave = (e) => {
        e.preventDefault(); //prevents default browser behaviour on click, whatever that means
        let seconds = 0;
        if (this.state.activeDropdownBtn === 'monthly' || this.state.activeDropdownBtn === 'weekly') {
             seconds = (parseInt(this.state.minSelected) * 60) + (parseInt(this.state.hourSelected) * 60 * 60) + (parseInt(this.state.daySelected) * 12 * 60 * 60);
        } else if (this.state.activeDropdownBtn ==='daily') {
            seconds = (parseInt(this.state.minSelected) * 60) + (parseInt(this.state.hourSelected) * 60 * 60);
        }
        if (seconds > 0) {
            let view = this.state.activeDropdownBtn + "Goal";
            saveGoal2(view, this.state.courseID, seconds, Date.now());
            this.setState({
                show:false
            })
        }
    };

    getDaysHoursMins(sec) {
        let days = Math.floor(sec / (60 * 60 * 12));
        let remainder = sec - (days * 60 * 60 * 12);
        let hours = Math.floor(remainder / (60 * 60));
        remainder = sec - (days * 60 * 60 * 12) - (hours * 60 * 60);
        let minutes = Math.floor(remainder / 60);
        return [days, hours, minutes];
    }

    handleUse = (e) => {

        e.preventDefault(); //prevents default browser behaviour on click, whatever that means
        if (this.state.activeDropdownBtn == 'weekly') {
            let time = this.getDaysHoursMins(this.state.teacherRecommendation);
            this.setState({
                daySelected: time[0],
                hourSelected: time[1],
                minSelected: time[2]
            })
        } else if (this.state.activeDropdownBtn == 'monthly') {
            let time = this.getDaysHoursMins(this.state.teacherRecommendation * 4);
            this.setState({
                daySelected: time[0],
                hourSelected: time[1],
                minSelected: time[2]
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
        console.log(this.state.courseID)
        console.log(this.state.teacherRecommendation)
        let close = () => this.setState({show: false});

        return (
            <div className="main" style={{marginBottom: 10}}>
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
                        <div>
                            {this.getView()}
                            <Label className="help-label">
                                {this.state.teacherRecommendation != null && this.state.activeDropdownBtn == 'monthly' ?
                                "Teacher expectation: " +  this.secondsToString(this.state.teacherRecommendation * 4)[1] :
                                (this.state.teacherRecommendation != null && this.state.activeDropdownBtn == 'weekly') ?
                                    "Teacher expectation: " +  this.secondsToString(this.state.teacherRecommendation)[1] :
                                    (this.state.teacherRecommendation != null && this.state.activeDropdownBtn == 'daily') ?
                                    null : "Teacher expectation not set"}
                            </Label>
                            {this.state.teacherRecommendation != null && this.state.activeDropdownBtn != 'daily' ? <Button bsSize="small" onClick={this.handleUse}>Use</Button> : null}
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <div>
                            {" "}
                            <Button onClick={this.handleSave}>Save</Button>
                            <Button onClick={close}>Close</Button>

                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}