import React, { Component } from 'react';
import {Button, Modal, FormGroup, Label, Form, DropdownButton, MenuItem} from 'react-bootstrap';
import { ref } from '../../config/constants'
import {getDaysHoursMins} from '../../helpers/helperFunctions';
import { setGoal } from '../../helpers/auth'
import FeedbackMessage from '../FeedbackMessage'
import './editGoal.css'


export default class EditGoal extends Component {

    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.handleSaveBtn = this.handleSaveBtn.bind(this);
        this.handleUseBtn = this.handleUseBtn.bind(this);
        this.state = {
            showModal: this.props.showModal,
            courseID: this.props.courseID,
            daySelected: '0',
            hourSelected: '0',
            minSelected: '0',
            teacherRecommendation: null,
            view: props.view //eks Daily Goal:
        }
    }

    componentWillMount(){
        /*
         Fetches teacher recommendation from firebase.
         */
        let that = this;
        let coursesRef = ref.child("/courses/" + this.state.courseID + "/weekly");
        coursesRef.on("value", function(snapshot){
            that.setState({
                teacherRecommendation: snapshot.val(),
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        
        this.setState({
            showModal: nextProps.showModal,
            courseID: nextProps.courseID,
        });
    }
    


    handleUseBtn(e) {
        /*
         When use-button is clicked, dropdown menu is set with teacher recommendation.
         */
        
        e.preventDefault(); //prevents default browser behaviour on click
        if (this.state.view == 'Weekly Goal') {
            let time = getDaysHoursMins(this.state.teacherRecommendation);
            this.setDays(time[0]);
            this.setHours(time[1]);
            this.setMinutes(time[2]);
        } else if (this.state.view == 'Monthly Goal') {
            let time = getDaysHoursMins(this.state.teacherRecommendation * 4);
            this.setDays(time[0]);
            this.setHours(time[1]);
            this.setMinutes(time[2]);
        }
    };

    handleSaveBtn(e){
        /*
         On save-click dropdown values are converted into seconds and stored in firebase
         */
        e.preventDefault(); //prevents default browser behaviour on click
        let seconds = 0;
        if (this.state.view === 'Monthly Goal' || this.state.view === 'Weekly Goal') {
            seconds = (parseInt(this.state.minSelected) * 60) + (parseInt(this.state.hourSelected) * 60 * 60) + (parseInt(this.state.daySelected) * 12 * 60 * 60);
        } else if (this.state.view ==='Daily Goal') {
            seconds = (parseInt(this.state.minSelected) * 60) + (parseInt(this.state.hourSelected) * 60 * 60);
        }
        if (seconds > 0) {
            let view = (this.state.view === "Monthly Goal") ? "monthlyGoal" :(this.state.view === "Weekly Goal") ? "weeklyGoal": "dailyGoal";
            setGoal(view, this.state.courseID, seconds, Date.now());
            this.setState({
                displayFeedbackMessage: true,
                feedbackMessage: this.state.view + " set. ",
                bsStyle: 'success',
            });
        }
    };

    getDropdowns(view) {
        /*
         Helper method for render method. Populates the dropdownmenus with correct information.
         */
        let items = [];
        if (view === 'Monthly Goal' || view === 'Weekly Goal') {
            items.push(<Label className="plain-label" key={1}>Days:</Label>);
            items.push(<DropdownButton key={2} title={this.state.daySelected}
                                       id={'dropdown-basic'}>{this.getMenuItems('days', view)}</DropdownButton>);
        }
        items.push(<Label className="plain-label" key={3}>Hours:</Label>);
        items.push(<DropdownButton key={4} title={this.state.hourSelected}
                                   id={'dropdown-basic'}>{this.getMenuItems('hours', view)}</DropdownButton>);
        items.push(<Label className="plain-label" key={5}>Minutes:</Label>);
        items.push(<DropdownButton key={6} title={this.state.minSelected}
                                   id={'dropdown-basic'}>{this.getMenuItems('minutes', view)}</DropdownButton>);
        return (
            <Form className="enter-form" inline>
                {items}
            </Form>
        )
    }

    getMenuItems(box, view) {
        let items = [];
        let max = 0;
        view === "Monthly Goal" ? max=32 : view === 'Weekly Goal' ? max = 8 : 0;
        if (box==='days') {
            for(let i=0; i<max; i++) {
                items.push(<MenuItem onClick={() => this.setDays(i)} key={i}>{i}</MenuItem>);
            }
        }
        if (box==='hours') {
            for(let i=0; i<13; i++) {
                items.push(<MenuItem onClick={() => this.setHours(i)} key={i}>{i}</MenuItem>);
            }
        }
        if (box==='minutes') {
            for(let i=0; i<60; i+=15) {
                items.push(<MenuItem onClick={() => this.setMinutes(i)} key={i}>{i}</MenuItem>);
            }
        }
        return items;
    }

    setDays(num) {
        num !== 0 ? this.setState({daySelected: num}) : this.setState({daySelected : '0'});
    }

    setHours(num) {
        num !== 0 ? this.setState({hourSelected: num}) : this.setState({hourSelected : '0'});

    }

    setMinutes(num) {
        num !== 0 ? this.setState({minSelected: num}) : this.setState({minSelected : '0'});
    }

    close(){
        this.props.closeModal(this.state.view);
    }

    render() {
        return (
            <div className="main">
                <Modal className="modal" show={this.state.showModal} onHide={this.close} container={this}>
                    <Modal.Header closeButton>
                        <Form inline>
                            <FormGroup className="validation-form">
                                <Label className="bold">{this.state.courseID}</Label>
                                <Label className="plain-label">Enter {this.state.view}:</Label>
                            </FormGroup>
                        </Form>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            {this.getDropdowns(this.state.view)}
                            <div>
                                <Label className="help-label">{this.state.view !== 'Daily Goal' ? "1 day is considered 12 hours" : null}</Label>
                            </div>
                            <Label className="help-label">
                                {this.state.teacherRecommendation !== null && this.state.view == 'Monthly Goal' ?
                                    "Teacher expectation: " +  getDaysHoursMins(this.state.teacherRecommendation * 4)[4] :
                                    (this.state.teacherRecommendation !== null && this.state.view == 'Weekly Goal') ?
                                        "Teacher expectation: " +  getDaysHoursMins(this.state.teacherRecommendation)[4] :
                                        (this.state.teacherRecommendation !== null && this.state.view === 'Daily Goal' ?
                                            null : "Teacher expectation not set")}
                            </Label>
                            {this.state.teacherRecommendation !== null && this.state.view !== 'Daily Goal' ?
                                <Button bsSize="small" onClick={this.handleUseBtn}>Use</Button> : null}
                        </div>

                        <FeedbackMessage active={this.state.displayFeedbackMessage} message={this.state.feedbackMessage} bsStyle={this.state.bsStyle}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <div>
                            {" "}
                            <Button onClick={this.handleSaveBtn}>Save</Button>
                            <Button onClick={this.close}>Close</Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}