import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import {Form, FormGroup, Button} from 'react-bootstrap'
import {secondsToString, getFirstInMonthWeekDay} from '../../helpers/helperFunctions';
import { saveProgress, activateGoal, saveExpiredGoal, isGoalActive } from '../../helpers/auth'

import EditGoal from './EditGoal';
import './circularProgress.css'

export default class CircularProgress extends Component {
    constructor(props){
        super(props);
        this.closeModal = this.closeModal.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.state = {
            courses: this.props.courses,
            course: this.props.course,
            courseID: this.props.courseID,
            time: this.props.course.time,
            dailyTimeSpent: this.props.course.goals.dailyGoal.timeSpent,
            weeklyTimeSpent: this.props.course.goals.weeklyGoal.timeSpent,
            monthlyTimeSpent: this.props.course.goals.monthlyGoal.timeSpent,

            showDailyEdit: false,
            showWeeklyEdit: false,
            showMonthlyEdit: false,

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
            courseID: nextProps.courseID,
            // dailyGoal: this.props.course.goals.dailyGoal.value,
            // dailySet: this.props.course.goals.dailyGoal.timeSet,
            // weeklyGoal: this.props.course.goals.weeklyGoal.value,
            // weeklySet: this.props.course.goals.weeklyGoal.timeSet,
            // monthlyGoal: this.props.course.goals.monthlyGoal.value,
            // monthlySet: this.props.course.goals.monthlyGoal.timeSet,
            // dailyTimeSpent: this.props.course.goals.dailyGoal.timeSpent,
            // weeklyTimeSpent: this.props.course.goals.weeklyGoal.timeSpent,
            // monthlyTimeSpent: this.props.course.goals.monthlyGoal.timeSpent,
        });
    }

    componentWillMount(){
        /*
         1. Iterates through the study-sessions stored in firebase and calculates when (day/week/month) the session took place.
         2. Deactivates goals that have expired
         3. Checks if any of the goals have expired. If expired the progress is saved as an old goal.
         4. The current daily, weekly, monthly progress is saved.
         */

        let tid = 0;
        if (!(this.props.course.sessions == null) || !(this.props.course.sessions == undefined)) {
            let list = this.props.course.sessions;
            let today = 0;
            let lastWeek = 0;
            let lastMonth = 0;
            let dates = getFirstInMonthWeekDay();

            {Object.keys(list).map((key) => {
                tid = tid + list[key].time;
                if (key > dates[0]) {
                    today = today + list[key].time;
                }
                if (key > dates[1]) {
                    lastWeek = lastWeek + list[key].time;
                }
                if (key > dates[2]) {
                    lastMonth = lastMonth + list[key].time;
                }
            })}

            this.deactivateGoal();
            this.checkExpired();

            //saves current progress in daily, weekly or monthly goal.
            saveProgress(this.state.courseID, "dailyGoal", today);
            saveProgress(this.state.courseID, "weeklyGoal", lastWeek);
            saveProgress(this.state.courseID, "monthlyGoal", lastMonth);

            this.setState ({
                course: this.props.course,
                time : tid,
                dailyTimeSpent: today,
                weeklyTimeSpent: lastWeek,
                monthlyTimeSpent: lastMonth,
            });

        }
    }


    deactivateGoal() {
        /*
         Checks if the goal has expired. If expired the goal is set to inactive in firebase.
         */

        let dates = getFirstInMonthWeekDay();
        if (this.state.dailySet <= parseInt(dates[0].valueOf())) {
            activateGoal("dailyGoal", this.state.courseID, false);
        } else {
            activateGoal("dailyGoal", this.state.courseID, true);
        }
        if (this.state.weeklySet <= parseInt(dates[1].valueOf())) {
            activateGoal("weeklyGoal", this.state.courseID, false);
        } else {
            activateGoal("weeklyGoal", this.state.courseID, true);
        }
        if (this.state.monthlySet <= parseInt(dates[2].valueOf())) {
            activateGoal("monthlyGoal", this.state.courseID, false)
        } else {
            activateGoal("monthlyGoal", this.state.courseID, true);
        }
    }


    checkExpired() {
        /*
         Checks if the goal is active.
         If the goal is inactive and some amount of time has been spent on the course, the goal is stored in oldGoals in firebase.
         */
        if (!isGoalActive(this.state.courseID, "dailyGoal") && this.state.dailySet !== 0) {
            if (this.state.dailyTimeSpent !== 0) {
                saveExpiredGoal('daily',this.state.dailySet, this.state.courseID, this.state.dailyGoal, this.state.dailyTimeSpent);
            }
        }
        if (!isGoalActive(this.state.courseID, "weeklyGoal") && this.state.weeklySet !== 0) {
            if (this.state.weeklyTimeSpent !== 0 ) {
                saveExpiredGoal('weekly',this.state.weeklySet, this.state.courseID, this.state.weeklyGoal, this.state.weeklyTimeSpent);
            }

        }
        if (!isGoalActive(this.state.courseID, "monthlyGoal") && this.state.monthlySet !== 0) {
            if (this.state.monthlyTimeSpent !== 0) {
                saveExpiredGoal('monthly',this.state.monthlySet, this.state.courseID, this.state.monthlyGoal, this.state.monthlyTimeSpent);
            }

        }

    }

    handleModal(view) {
        /*
         -param: view (daily/weekly/monthly)
         -On edit-button click edit-modal based on view is shown.
         */

        if (view === "Daily Goal") {
            this.setState({showDailyEdit: true});
        }
        else if (view === "Weekly Goal") {
            this.setState({showWeeklyEdit: true});
        }
        else if (view === "Monthly Goal") {
            this.setState({showMonthlyEdit: true});
        }
    }

    closeModal(view) {
        view === "Daily Goal" ? this.setState({showDailyEdit: false}):
            view === "Weekly Goal" ? this.setState({showWeeklyEdit: false}):
                view === "Monthly Goal" ?  this.setState({showMonthlyEdit: false}): null;

    }

    createInfoComponent(view, percentage, goal, remaining, timeSpent) {
        /*
         -Sets the progress percentage, color on progressbar and displays the goal if set.
         */
 
        let items = [];
        items.push(
            <div key={1} className="view-box" >
                <label className="view-label">{view}</label>
                <Button className="edit-btn" onClick={(e) => this.handleModal(view)}>Edit</Button>
            </div>
        );
        let dates = getFirstInMonthWeekDay();
        if (
            (this.state.dailySet !== 0 && view === "Daily Goal" && this.state.dailySet <= parseInt(dates[0])) ||
            (this.state.weeklySet !== 0 && view === "Weekly Goal" && this.state.weeklySet <= parseInt(dates[1])) ||
            (this.state.monthlySet !== 0 && view === "Monthly Goal" && this.state.monthlySet <= parseInt(dates[2]))) {
            goal = "(Expired)";
            percentage = 0;
            remaining = null;
        }
        items.push(
            <Form key={2} className="circular-form">
                <FormGroup className="circular-component">
                    <CircularProgressbar align="middle" percentage={percentage} classForPercentage={() => {
                        return percentage === 100 ? 'complete' : percentage >= 75 ?
                                'threeQuarters': percentage >= 50 ? 'half': percentage >= 25 ?
                                        'oneFourth': percentage >= 12.5 ? 'oneEight': 'start';
                    }}/>
                </FormGroup>
                <FormGroup className="information-text">
                    <h4>Goal: {goal}</h4>
                    <h4>{remaining}</h4>
                    <h4>{timeSpent}</h4>
                </FormGroup>
            </Form>
        );
        return items;
    }


    getStrings(goalValue, timeSpent, view) {

        //Determines the text to be presented to the user.

        let percent, goal, remaining, spent;
        timeSpent !== 0 ? spent = "Time spent " + view + secondsToString(timeSpent) : spent = "No progress recorded";
        if (goalValue !== 0) {
            goal = secondsToString(goalValue);
            percent = Math.floor((timeSpent / goalValue) * 100);
            if (timeSpent !== 0) {
                percent < 100 ? remaining = "Remaining: " + secondsToString(goalValue - timeSpent + 60): remaining = "Completed";
                if (percent > 100) percent = 100;
            }
        } else if (goalValue === 0) {
            goal = "Not Set";
            percent = 0;
        }
        return [percent, goal, remaining, spent];

    }

    render() {
        let goals = this.state.course.goals;
        let dailyInfo = this.getStrings(goals.dailyGoal.value, this.state.dailyTimeSpent, "today: ");
        let weeklyInfo = this.getStrings(goals.weeklyGoal.value, this.state.weeklyTimeSpent, "this week: ");
        let monthlyInfo = this.getStrings(goals.monthlyGoal.value, this.state.monthlyTimeSpent, "this month: ");

        return (
            <div>
                {this.createInfoComponent("Daily Goal", dailyInfo[0], dailyInfo[1], dailyInfo[2], dailyInfo[3])}
                {this.createInfoComponent("Weekly Goal", weeklyInfo[0], weeklyInfo[1], weeklyInfo[2], weeklyInfo[3])}
                {this.createInfoComponent("Monthly Goal", monthlyInfo[0], monthlyInfo[1], monthlyInfo[2], monthlyInfo[3])}
                <EditGoal courseID={this.props.courseID} showModal={this.state.showDailyEdit} view={"Daily Goal"} closeModal={this.closeModal.bind(this)}/>
                <EditGoal courseID={this.props.courseID} showModal={this.state.showWeeklyEdit} view={"Weekly Goal"} closeModal={this.closeModal.bind(this)}/>
                <EditGoal courseID={this.props.courseID} showModal={this.state.showMonthlyEdit} view={"Monthly Goal"} closeModal={this.closeModal.bind(this)}/>
            </div>
        );
    }

}