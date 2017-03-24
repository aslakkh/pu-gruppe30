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
            goal: this.props.course.goal,
            daily: 0,
            weekly: 0,
            monthly: 0,
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            course: nextProps.course,
            goal: nextProps.course.goal
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
                monthly: last_month,
                goal: this.props.course.goal
            });
        }

    }

    setProgressColor(goal){
        if(this.state.monthly > (goal)/1.6){
            return("success")
        }
        else if (this.state.monthly > (goal)/2.8){
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
            return ((this.state.time/this.state.goal) * 100);
        } else if (view == 'week') {
            return ((this.state.time/(this.state.goal/4)) * 100);
        } else if (view == 'day') {
            return ((this.state.time/(this.state.goal/20)) * 100);
        }
    }



    parseGoal() {
        let seconds = this.state.goal;
        let hours = Math.floor(seconds/(60*60));
        let remainder = seconds % (60*60);
        let minutes = remainder/60;
        let items = [];
        if (hours == 0 && minutes == 0) {
            items.push(
                <label className="label-goal" key={0}>not set</label>
            )
        } else {
            if (hours != 0) {
                items.push(
                    <label className="label-goal" key={1}>{hours} hours </label>
                )
            }
            if (minutes != 0) {
                items.push(" ");
                items.push(
                    <label className="label-goal" key={2}> {minutes} minutes</label>
                )
            }
        }
        return items;

    }

    render() {
        return (
            <div className="courseView">
                <Form inline>
                    <label className="label-goal">Monthly goal:</label>
                    {" "}
                    <label className="label-goal"> {this.parseGoal()}</label>
                    {"  "}
                </Form>
                <h3 className="total">Total time spent {formattedSeconds(this.state.time)}</h3>
                <h3>Daily progress</h3>
                    <h1 className = "daily">
                        <ProgressBar now={this.setProgressBar("day")} bsStyle={this.setProgressColor(this.state.goal)} label={formattedSeconds(this.state.daily)} max={200}/>
                </h1>
                <h3>Weekly progress</h3>
                    <h1 className = "weekly">
                        <ProgressBar now={this.setProgressBar("week")} bsStyle={this.setProgressColor(this.state.goal)} label={formattedSeconds(this.state.weekly)} max={200}/>
                    </h1>
                <h3>Monthly progress</h3>
                    <h1 className = "monthly">
                        <ProgressBar now={this.setProgressBar("month")} bsStyle={this.setProgressColor(this.state.goal)} label={formattedSeconds(this.state.monthly)} max={200}/>
                    </h1>
                <EditGoals courseID={this.props.courseID}/>
            </div>
        );
    }
}




