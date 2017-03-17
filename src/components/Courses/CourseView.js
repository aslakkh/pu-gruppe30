/**
 * Created by anderssalvesen on 07.03.2017.
 */

import React, { Component } from 'react';
import {ProgressBar} from 'react-bootstrap';

const formattedSeconds = ((sec) => //formats to hh:mm:ss
Math.floor (sec/3600)+ ':' + Math.floor(sec / 60) + '.' + ('0' + sec % 60).slice(-2))

export default class CourseView extends Component {

    constructor(props){
        super(props);
        this.state = {
            courses: this.props.courses,
            course: this.props.course,
            time: this.props.course.time,
            goal: this.props.goal,
            daily: 0,
            weekly: 0,
            monthly: 0
        }
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
            console.log(this_day);
            console.log("First in week: " + monday);
            console.log("First in month " + firstInMonth);

            console.log(this.props.courseID)
            console.log(today);
            console.log(last_week);
            console.log(last_month);
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
        return (
            <div className="courseView">
                <h1 className="total">Total time spent {formattedSeconds(this.state.time)}
                </h1>
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
            </div>

        );
    }

}