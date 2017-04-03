import React, { Component } from 'react';
import {ProgressBar, Form, Button, ButtonGroup, ButtonToolbar} from 'react-bootstrap';
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

            dailyGoal: this.props.course.goals.dailyGoal.value,
            dailySet: this.props.course.goals.dailyGoal.timeSet,
            weeklyGoal: this.props.course.goals.weeklyGoal.value,
            weeklySet: this.props.course.goals.weeklyGoal.timeSet,
            monthlyGoal: this.props.course.goals.monthlyGoal.value,
            monthlySet: this.props.course.goals.monthlyGoal.timeSet,
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            course: nextProps.course,
            dailyGoal: nextProps.course.goals.dailyGoal.value,
            dailySet: nextProps.course.goals.dailyGoal.timeSet,
            weeklyGoal: nextProps.course.goals.weeklyGoal.value,
            weeklySet: nextProps.course.goals.weeklyGoal.timeSet,
            monthlyGoal: nextProps.course.goals.monthlyGoal.value,
            monthlySet: nextProps.course.goals.monthlyGoal.timeSet,
        });
    }

    componentWillMount(){
        let tid = 0;
        if (!(this.props.course.sessions == null) || !(this.props.course.sessions == undefined)) {
            let list = this.props.course.sessions;
            let today = 0;
            let lastWeek = 0;
            let lastMonth = 0;


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
                    lastWeek = lastWeek + list[key].time;
                }
                if (key > firstInMonth.valueOf()) {
                    lastMonth = lastMonth + list[key].time;
                }
            })}

            this.setState ({
                course: this.props.course,
                time : tid,
                dailyTimeSpent: today,
                weeklyTimeSpent: lastWeek,
                monthlyTimeSpent: lastMonth,
                goal: this.props.course.goal
            });
        }

    }

    setProgressColor(goal, view){
        if(view > (goal/1.6)){
            return("success")
        }
        else if (view > (goal/2.8)){
            return("warning")
        }
        else{
            return("danger")
        }
    }

    setProgressBar(view) {

        if (this.state.goal == 0) {
            return 0;
        }
        if (view == 'month') {
            let percent = (this.state.monthlyTimeSpent/this.state.monthlyGoal) * 100;
            if (percent >= 100) {
                return 200;
            } else {
                return percent * 2;
            }
        } else if (view == 'week') {
            let percent = (this.state.weeklyTimeSpent/this.state.weeklyGoal) * 100;
            if (percent >= 100) {
                return 200;
            } else {
                return percent * 2;
            }
        } else if (view == 'day') {
            let percent = (this.state.dailyTimeSpent/this.state.dailyGoal) * 100;
            if (percent >= 100) {
                return 200;
            } else {
                return percent * 2;
            }
        }
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

    getGoals() {

        //TODO nytt mål/ mål utgått. Beskjed til brukeren
        /*
            Checks if and/or when the goals were set. If set and not expired, the goals are converted from milliseconds
            to a readable string(hours, minutes).
         */

        let date = new Date();
        let firstInMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        firstInMonth.setHours(0, 0, 0, 0);

        let today = new Date();
        today.setHours(0,0,0,0);

        let firstInWeek = new Date();
        firstInWeek.setDate(firstInWeek.getDate() - firstInWeek.getDay() + 1);
        firstInWeek.setHours(0, 0, 0, 0);

        let goals = [];

        if (this.state.dailySet === 0) {
            goals.push("not set")
        } else if (this.state.dailySet <= parseInt(today.valueOf())) {
            goals.push("Expired")
        } else {
            goals.push(this.secondsToString(this.state.dailyGoal)[1])
        }

        if (this.state.weeklySet === 0) {
            goals.push("not set")
        } else if (this.state.weeklySet <= parseInt(firstInWeek.valueOf())) {
            goals.push("Expired")
        }
        else {
            goals.push(this.secondsToString(this.state.weeklyGoal)[1])
        }

        if (this.state.monthlySet === 0) {
            goals.push("not set")
        } else if (this.state.monthlySet <= parseInt(firstInMonth.valueOf())) {
            goals.push("Expired")
        } else {
            goals.push(this.secondsToString(this.state.monthlyGoal)[1]);
        }
        return goals;

    }

    render() {
        let goals = this.getGoals();
        return (
            <div className="courseView">
                <div className="teacher-rec">Teacher recommendation: </div>

                <Form inline>
                    <label className="label-goal">Daily goal:</label>
                    {" "}
                    <label className="label-goal">{goals[0]}</label>

                </Form>
                <h3>Status: {this.state.dailyTimeSpent != null ? (this.state.dailyGoal-this.state.dailyTimeSpent <= 0 ? "Completed" : this.secondsToString(this.state.dailyGoal - this.state.dailyTimeSpent)[1] + " remaining") : ""}</h3>
                <h1 className = "daily">
                    <ProgressBar now={this.setProgressBar("day")} bsStyle={this.setProgressColor(this.state.dailyGoal, this.state.dailyTimeSpent)} label={this.state.dailyTimeSpent != null ? this.secondsToString(this.state.dailyTimeSpent)[0] : "00:00:00"} max={200}/>
                </h1>

                <Form inline>
                    <label className="label-goal">Weekly goal:</label>
                    {" "}
                    <label className="label-goal">{goals[1]}</label>
                </Form>
                <h3>Status: {this.state.weeklyTimeSpent != null ? (this.state.weeklyGoal-this.state.weeklyTimeSpent <= 0 ? "Completed" : this.secondsToString(this.state.weeklyGoal - this.state.weeklyTimeSpent)[1] + " remaining"): ""}</h3>
                <h1 className = "weekly">
                    <ProgressBar now={this.setProgressBar("week")} bsStyle={this.setProgressColor(this.state.weeklyGoal, this.state.weeklyTimeSpent)} label={this.state.weeklyTimeSpent != null ? this.secondsToString(this.state.weeklyTimeSpent)[0]: "00:00:00"} max={200}/>
                </h1>

                <Form inline>
                    <label className="label-goal">Monthly goal:</label>
                    {" "}
                    <label className="label-goal">{goals[2]}</label>
                </Form>

                <h3>Status: {this.state.monthlyTimeSpent != null ? (this.state.monthlyGoal-this.state.monthlyTimeSpent <= 0 ? "Completed" : this.secondsToString(this.state.monthlyGoal - this.state.monthlyTimeSpent)[1] + " remaining"): ""}</h3>
                    <h1 className = "monthly">
                        <ProgressBar now={this.setProgressBar("month")} bsStyle={this.setProgressColor(this.state.monthlyGoal, this.state.monthlyTimeSpent)} label={this.state.monthlyTimeSpent != null ? this.secondsToString(this.state.monthlyTimeSpent)[0]: "00:00:00"} max={200}/>
                    </h1>
                <EditGoals courseID={this.props.courseID}/>
            </div>
        );
    }
}




