import React, { Component } from 'react';
import {Button, Modal, FormGroup, Label, Form, DropdownButton, MenuItem} from 'react-bootstrap';
import { ref } from '../../config/constants'
import {getDaysHoursMins} from '../../helpers/helperFunctions';
import { setRecommendedTime } from '../../helpers/auth'
import FeedbackMessage from '../FeedbackMessage'


export default class SetTime extends Component {

    constructor(props) {
        super(props);
        this.handleSaveBtn = this.handleSaveBtn.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.state = {
            courseID: this.props.courseID,
            daySelected: '0',
            hourSelected: '0',
            minSelected: '0',
            view: "Weekly Goal",
        }
    }

    componentWillReceiveProps(nextProps) {
        
        //remove feedbackmessage (if any) and update course and time values if user has moved to a different course page
        if(nextProps.courseID !== this.state.courseID){
            this.setState({
                displayFeedbackMessage: false,
                courseID: nextProps.courseID,
                daySelected: '0',
                hourSelected: '0',
                minSelected: '0',
            })
        }
        
    }
    


    handleSaveBtn(e){
        /*
         On save-click dropdown values are converted into seconds and stored in firebase
         */
        e.preventDefault(); //prevents default browser behaviour on click
        let seconds = 0;

        //convert input to seconds
        seconds = (parseInt(this.state.minSelected) * 60) + (parseInt(this.state.hourSelected) * 60 * 60) + (parseInt(this.state.daySelected) * 12 * 60 * 60);


        if (seconds > 0) {
            let view = "weeklyGoal";
            setRecommendedTime(this.state.courseID, seconds);
            this.setState({
                displayFeedbackMessage: true,
                feedbackMessage: "Recommended time per week for " + this.state.courseID + " set to " + this.state.daySelected + " days, " + this.state.hourSelected + " hours, " + this.state.minSelected + " minutes. ",
                bsStyle: 'success',
            });
        }
        else{
            this.setState({
                displayFeedbackMessage: true,
                feedbackMessage: "Invalid value: recommended time must be greater than 0. ",
                bsStyle: 'warning',
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


    //closer for modal
    close(){
        this.setState({ showModal: false });
    }

    //opener for modal
    open(course){
        //gets teacher recommendation and updates state
        let that = this;
        let coursesRef = ref.child("/courses/" + this.state.courseID + "/weekly");
        coursesRef.on("value", function(snapshot){
            that.setState({
                teacherRecommendation: getDaysHoursMins(snapshot.val()),
            });
        });
        this.setState({ 
            showModal: true,

        });
    }

    //helper returning h4 displaying current teacher recommendation
    displayTeacherRecommendation(){
        if(this.state.teacherRecommendation !== undefined){
            return (<h4>Current recommendation: {this.state.teacherRecommendation[0]} days, {this.state.teacherRecommendation[1]} hours, {this.state.teacherRecommendation[2]} minutes.</h4>)
        }else{
            return (<h4>No current recommendation set </h4>)
        }
    }

    render() {
        return (
            <div style={{marginBottom: '10px'}}>
                <Button block bsStyle="primary" onClick={this.open}><h4>Set recommended weekly time</h4></Button>

                <Modal className="modal" show={this.state.showModal} onHide={this.close} container={this}>
                    <Modal.Header closeButton>
                        <Form inline>
                            <FormGroup className="validation-form">
                                <Label className="bold">{this.state.courseID}</Label>
                                <Label className="plain-label">Enter recommended time spent per week:</Label>
                            </FormGroup>
                        </Form>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <p>Here you can set the recommended time use per week for students taking {this.state.courseID}.</p>
                            <p>Students will see your recommendation when setting their personal weekly goals.</p>
                            <p>One day is equal to 12 hours</p>
                            {this.getDropdowns(this.state.view)}
                            {this.displayTeacherRecommendation()}
                        </div>
                        <FeedbackMessage active={this.state.displayFeedbackMessage} message={this.state.feedbackMessage} bsStyle={this.state.bsStyle}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <div>
                            <Button onClick={this.handleSaveBtn} bsStyle="success">Save</Button>
                            <Button onClick={this.close}>Close</Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            
                    
            </div>
        );
    }
}