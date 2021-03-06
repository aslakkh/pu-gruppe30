/**
 * Created by jan on 21/03/2017.
 */
import React, { Component } from 'react'
import firebase from 'firebase';
import {Button} from 'react-bootstrap'

Date.prototype.getWeek = function() {

    // Create a copy of this date object
    var target  = new Date(this.valueOf());

    // ISO week date weeks start on monday, so correct the day number
    var dayNr   = (this.getDay() + 6) % 7;

    // Set the target to the thursday of this week so the
    // target date is in the right year
    target.setDate(target.getDate() - dayNr + 3);

    // ISO 8601 states that week 1 is the week with january 4th in it
    var jan4    = new Date(target.getFullYear(), 0, 4);

    // Number of days between target date and january 4th
    var dayDiff = (target - jan4) / 86400000;

    if(new Date(target.getFullYear(), 0, 1).getDay() < 5) {
        // Calculate week number: Week 1 (january 4th) plus the
        // number of weeks between target date and january 4th
        return 1 + Math.ceil(dayDiff / 7);
    }
    else {  // jan 4th is on the next week (so next week is week 1)
        return Math.ceil(dayDiff / 7);
    }
};
const options = {
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each bar to be 2px wide and green
    elements: {
        rectangle: {
            borderWidth: 5,
            borderColor: 'rgb(0, 255, 0)',
            borderSkipped: 'bottom'
        }
    },
    responsive: true,
    legend: {
        position: 'top'
    },
    title: {
        display: true,
        text: 'Chart.js Bar Chart'
    }
};



let BarChart = require("react-chartjs").Bar;

const {Bar} = require("react-chartjs");
export default class Statistics extends Component {
    constructor(props) {
        super(props);
        this.list2=[];
        this.labels=[];
        this.show=false;
        this.kurs = this.props.courseID
        this.state = {
            show: false,
            done:false,
            courseID: this.props.courseID,
            daily:0,
            weekly:0,
            monthly:0,
            data:{
                labels: [],
                datasets: [
                    {
                        label: 'Time',
                        backgroundColor: "rgba(0,220,0,0.5)",
                        data: []
                    }
                    ]
            }

        };
        this.sessions =[]
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            show: false,
            done:false,
            courseID: nextProps.courseID,
            daily:0,
            weekly:0,
            monthly:0,
            data:{
                labels: [],
                datasets: [
                    {
                        label: 'Time',
                        backgroundColor: "rgba(0,220,0,0.5)",
                        data: []
                    }
                ]
            }

        })
        this.list2=[];
        this.kurs= nextProps.courseID;
        this.labels=[];
        this.show=false;
        this.sessions =[]
        this.forceUpdate()
        this.getDataFromFirebase()


        ;
    }

    componentDidMount(){
        this.getDataFromFirebase()
    }

    /*
    get sessions from database and selects only for the specific course
     */
    getDataFromFirebase(){
        let that = this;
        let kurs = this.kurs;
        let ting = [];
        that.sessions = []
        let messageRef = firebase.database().ref();
        messageRef.child('users/').on('child_added', function(snapshot) {
            if(snapshot.val()['courses'] != undefined){
            if(snapshot.val().courses[that.kurs] != undefined) {
                if(snapshot.val().courses[that.kurs]['sessions'] != undefined) {
                    ting.push(snapshot.val().courses[that.kurs]['sessions']);
                    ting.forEach(function (session) {
                            Object.keys(session).map((singleSession) => {  //maps sessions as singleSession
                                that.sessions.push({'key': parseInt(singleSession), 'time': session[singleSession]['time']});
                            })
                        }
                    )
                    that.forceUpdate()
                }}}})

    }
    /*
    Sorting function
     */
    sortNumber(a,b) {
        return a - b;
    }
/*
Handles click on getStatistics-button
formats the sessions to usable data for chart.js
 */
    handleClick2(){
        if(this.sessions.length >0 &&!this.state.done){
            var list = this.sessions;
            Object.keys(list).map((key) => { //maps sessions to correct week
               let day = new Date(list[key]["key"]);
                if(isNaN(this.list2[day.getWeek()])){
                   this.list2[day.getWeek()]=0;
                }
                this.labels.indexOf(day.getWeek()) === -1 ? this.labels.push(day.getWeek()) : console.log();
                this.list2[day.getWeek()]=this.list2[day.getWeek()]+list[key]["time"]
            });
            this.list2 = this.list2.map((x) => x/3600);
            this.list2 = this.list2.filter(function(n){ return n != undefined });

            this.state.data.labels=this.labels.sort(this.sortNumber);
            this.state.data.datasets[0].data=this.list2;
        this.setState({
            show:true,
            done:true
        })}
    }


    render() {
        if(!this.sessions.length > 0 || this.state.courseID === null || this.state.courseID === undefined){
            return (
                <h4>No statistics</h4>
            )}
            else{
            return(<div>
                    <Button bsStyle="primary" bsSize="large" onClick={this.handleClick2.bind(this)}>Get Statistics</Button>
                    {this.state.show ? 
                    <div>
                        <BarChart data={this.state.data}  options={options}/>
                        <h4>X-axis displays week. Y-axis displays students' total time logged</h4>
                    </div>
                    : <h5>Loading statistics may take a while.</h5>}
                </div>
            )

        }
    }

}