import React, { Component } from 'react';
import {ProgressBar, Form} from 'react-bootstrap';
import EditGoals from './EditGoals';
import "./courseview.css"

const formattedSeconds = ((sec) => //formats to hh:mm:ss
Math.floor (sec/3600)+ ':' + Math.floor(sec / 60) + '.' + ('0' + sec % 60).slice(-2))

export default class CourseView extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            showEdit: false,
            courses: this.props.courses,
            course: this.props.course,
            courseID: this.props.courseID,
            time: this.props.course.time,
            //goal: this.props.goal,
            daily: 0,
            weekly: 0,
            monthly: 0,
        };
    }


    componentWillReceiveProps(nextProps){
        this.setState({
            course: nextProps.course
        });
    }

    componentWillMount(){
        let tid = 0;
        if (!(this.props.course.sessions === null) || !(this.props.course.sessions === undefined)) {
            let list = this.props.course.sessions;
            let today = 0;
            let last_week = 0;
            let last_month = 0;


            //last month:
            let date = new Date();
            let firstInMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            firstInMonth.setHours(0,0,0,0);

            //today
            let this_day = new Date();
            this_day.setHours(0,0,0,0);

            //last week (monday)
            let monday = new Date();
            monday.setDate(monday.getDate() - monday.getDay() + 1);
            monday.setHours(0,0,0,0);

            {Object.keys(list).map((key) => {
                tid = tid + list[key].time;
                if (key > this_day.valueOf()) {
                    today = today + list[key].time;
                }
                if (key > monday.valueOf()) {
                    last_week = last_week + list[key].time;
                }
                if (key > firstInMonth.valueOf()) {
                    last_month = last_month + list[key].time;
                }
            })}

            this.setState ({
                course: this.props.course,
                time : tid,
                daily: today,
                weekly: last_week,
                monthly: last_month
            });
        }

    }

    setProgressColor(goal){
        if(this.state.time > (goal)/1.6){
            return("success")
        }
        else if (this.state.time > (goal)/2.8){
            return("warning")

        }
        else{
            return("danger")
        }
    }

    render() {
        //TODO read goals from firebase
        return (
            <div className="courseView">
                <Form inline>
                    <label className="label-goal">Goal:</label>
                    {" "}
                    <label className="label-goal">8 hours/week</label>
                    {"  "}
                </Form>
                <h3 className="total">Total time spent {formattedSeconds(this.state.time)}</h3>
                <h3>Daily progress</h3>
                    <h1 className = "daily">
                        <ProgressBar now={this.state.daily} bsStyle={this.setProgressColor(this.state.goal)} label={formattedSeconds(this.state.daily)} max={200}/>
                </h1>
                <h3>Weekly progress</h3>
                    <h1 className = "weekly">
                        <ProgressBar now={this.state.weekly} bsStyle={this.setProgressColor(this.state.goal)} label={formattedSeconds(this.state.weekly)} max={200}/>
                    </h1>
                <h3>Monthly progress</h3>
                    <h1 className = "monthly">
                        <ProgressBar now={this.state.monthly} bsStyle={this.setProgressColor(this.state.goal)} label={formattedSeconds(this.state.monthly)} max={200}/>
                    </h1>
                <EditGoals courseID={this.props.courseID}/>
            </div>
        );
    }
}




