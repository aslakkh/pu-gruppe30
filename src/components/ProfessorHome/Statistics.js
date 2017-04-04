/**
 * Created by jan on 21/03/2017.
 */
import React, { Component } from 'react'
import firebase from 'firebase';
import {ref } from '../../config/constants'
import {Button} from 'react-bootstrap'
/*
 * Professors can see statistics over student in their classes
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
 */
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
            borderWidth: 2,
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
}



let BarChart = require("react-chartjs").Bar;

const {Bar} = require("react-chartjs")
export default class Statistics extends Component {
    constructor(props) {
        super(props);
        this.list2=[]
        this.show=false
        this.state = {
            show: false,
            courseID: this.props.courseID,
            daily:0,
            weekly:0,
            monthly:0,
            data:{
                labels: [],
                datasets: [
                    {
                        label: 'Time',
                        backgroundColor: "rgba(0,0,220,0.5)",
                        data: []
                    }
                    ]
            }

        };
        this.sessions =[]
    }


    componentWillMount(){
        this.getDataFromFirebase()
    }
    componentDidMount(){


    }


    getDataFromFirebase(){
        console.log(this.state.courseID)
        let that = this;
        let kurs = this.state.courseID
        let ting = []
        let messageRef = firebase.database().ref();
        messageRef.child('users/').on('child_added', function(snapshot) {
            if(snapshot.val().courses[kurs] != undefined && snapshot.val().courses[kurs]['sessions']) {
                ting.push(snapshot.val().courses[kurs]['sessions'])
                ting.forEach(function (session) {
                    Object.keys(session).map((session2) => {that.sessions.push({'key': parseInt(session2), 'time': session[session2]['time']});


                })
            }
                )
        }});

    }

    handleClick2(){
        if(this.sessions.length >0){
            var list = this.sessions;
            console.log(list);
            let monday = new Date();
            monday.setDate(monday.getDate()-monday.getDay()+1);
            let tuesday = new Date();
            tuesday.setDate(monday.getDate()-7);
/*            Object.keys(list).map((key) => {
                let day = new Date(list[key]["key"])
                console.log("uke "+tuesday.getWeek())

                if(day> tuesday ){
                    if(this.state.data.labels[0] !== tuesday.getWeek()){

                        this.state.data.labels.unshift(tuesday.getWeek());
                        this.list2.unshift(0);
                        console.log("New week")
                    }
                    console.log("Time added")
                    this.list2[0] =this.list2[0]+list[key]["time"];
                    delete list[key];
                }else{
                    tuesday.setDate(tuesday.getDate()- 7);
                }
            });*/

            Object.keys(list).map((key) => {
               let day = new Date(list[key]["key"]);
               console.log(day.getWeek())
                this.list2[day.getWeek()]=this.list2[day.getWeek()]+list[key]["time"]
                console.log(this.list2)
            });
            this.state.data.datasets[0].data=this.list2;//.slice(this.list2.length-11,this.list2.length-1)
            //this.state.data.labels=this.state.data.labels;//.slice(this.state.data.labels.length-11,this.state.data.labels.length-1)
            console.log(list);
            console.log("labels");
            console.log(this.state.data.labels);
            console.log("dataset");
            console.log(this.state.data.datasets);
        this.setState({
            show:true
        })}
    }
    handleClick(){
        this.setState({
            show:true
        });
        if((this.sessions.length > 0 )){
            let list = this.sessions;
            console.log(list)
            let today = 0;
            let last_week = 0;
            let last_month = 0;
            let tid =0;
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
                if (list[key].key > this_day.valueOf()) {
                    today = today + list[key].time;
                }
                if (list[key].key > monday.valueOf()) {
                    last_week = last_week + list[key].time;
                }
                if (list[key].key > firstInMonth.valueOf()) {
                    last_month = last_month + list[key].time;
                }
            })}
            console.log(today,last_month,last_week)
            this.setState ({
                daily: today,
                weekly: last_week,
                monthly: last_month
            });
        }
    }

    render() {
        if(!this.sessions.length > 0 ){
            return (
                <h1>Loading2</h1>

            )}
            else{
            return(<div>
                    <Button bsStyle="primary" bsSize="large" onClick={this.handleClick2.bind(this)}>Get Statistics</Button>

                    {this.state.show ? <BarChart data={this.state.data}  options={options}/> : <h5>Loading statistics may take a while.</h5>}

                </div>
            )

        }
    }

}