/**
 * Created by anderssalvesen on 31.03.2017.
 */

import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import { secondsToString } from '../Courses/CourseView'


export default class PastGoals extends React.Component {



    constructor(props){
        super(props);
        this.state = {
            courses: this.props.courses,
            course: this.props.course,
            courseID: this.props.courseID,
            view: this.props.view,
            numGoals: 0,
            numGoalCompleted: 0
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({

        });
    }

    componentWillMount() {

    }

    getResultColor(timeSpent, goal){
        if(timeSpent >= goal){
            return("success")
        }
        else if (timeSpent > (goal/1.34)){
            return("warning")
        }
        else{
            return("danger")
        }
    }

    getResultText(millisec, timeSpent, goal) {
        let result = "";
        let formattedDate = this.formatDate(millisec);
        if (this.state.view === 'Daily') {
            result = formattedDate[4] + " " + formattedDate[5] + "/" + formattedDate[2] + "/" + formattedDate[0] + ".";

        } else if (this.state.view === 'Weekly') {
            result = "Week " + formattedDate[3] + ". " + formattedDate[0] + ".";

        } else if (this.state.view === 'Monthly') {
            result = formattedDate[1] + " " + formattedDate[0] + "."
        }
        if (timeSpent >= goal) {
            result = result + " 100% completed. ";
        } else {
            result = result + " " + Math.floor((timeSpent/goal) * 100) + "% completed. ";
        }
        return result + "Goal: " + this.secondsToString(goal)[1] + ". Time spent: " +  this.secondsToString(timeSpent)[1];
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

    //TODO numgoals - 1

    createResultList(goalList) {
        if (goalList.length == 2) {
            return [<ListGroupItem>No results yet</ListGroupItem>];
        }
        let numGoals = 0;
        let numGoalsCompleted = 0;
        let numSecondsGoal = 0;
        let numSecondsCompleted = 0;


        let listGroupItems = [];
            {Object.keys(goalList).map((key) => {
                if (key != 1) {
                    numGoals = numGoals + 1;
                    let goal = goalList[key].goal;
                    let timeSpent = goalList[key].timeSpent;
                    if(timeSpent >= (goal)){
                        numGoalsCompleted = numGoalsCompleted + 1;
                    }
                    listGroupItems.push(
                        <ListGroupItem key={key} bsStyle={this.getResultColor(timeSpent, goal)}>
                            {this.getResultText(new Date(goalList[key].timeSet), timeSpent, goal)}
                        </ListGroupItem>);
                    numSecondsGoal = numSecondsGoal + goalList[key].goal;
                    numSecondsCompleted = numSecondsCompleted + goalList[key].timeSpent;
                }

            })}

        return [listGroupItems, numGoalsCompleted, numGoals, numSecondsCompleted, numSecondsGoal];
    }

    formatDate(millisec) {
        let months = ['January', 'February', 'Mars', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let formatDigit = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        let days = ['Monday' , 'Tuesday', 'Wednesday', 'Thursday', 'Friday', "Saturday", 'Sunday'];
        return [millisec.getUTCFullYear(), months[millisec.getUTCMonth()], formatDigit[millisec.getUTCMonth()], this.getWeekNumber(millisec),
            days[millisec.getUTCDay()], formatDigit[millisec.getUTCDay()], millisec.getUTCHours(), millisec.getUTCMinutes(), millisec.getUTCSeconds()];
    }

    getWeekNumber(millisec) {
        let date = new Date(millisec);
        date.setHours(0,0,0,0);
        date.setDate(date.getDate() + 4 - (date.getDay()||7));
        let yearStart = new Date(date.getFullYear(),0,1);
        return  Math.ceil(( ( (date - yearStart) / 86400000) + 1)/7);
    }



    render() {
        let results =
            this.state.view === 'Daily' ?
                this.createResultList(this.state.course.oldGoals.daily) : this.state.view === 'Weekly' ?
                this.createResultList(this.state.course.oldGoals.weekly): this.state.view === 'Monthly'?
                this.createResultList(this.state.course.oldGoals.monthly): null;
        return (
            <ListGroup>
                {results.length === 1 ? null :
                    <h3>Number of {this.state.view.toLowerCase()}  goals completed: {results[1]}/{results[2]} ({Math.floor((results[1]/results[2])*100)}%).
                        Time-goal accuracy {parseFloat((results[3]/results[4])).toFixed(2)}</h3>
                }
                {results[0]}
            </ListGroup>
        );
    }


}