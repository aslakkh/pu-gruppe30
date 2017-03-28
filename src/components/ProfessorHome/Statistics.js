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


export default class Statistics extends Component {
    constructor(props) {
        super(props);
        this.show=false
        this.state = {
            courseID: this.props.courseID,
            daily:0,
            weekly:0,
            monthly:0

        };
        this.data={
            labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July"
            ],
            datasets: [
                {
                    data: [1,2,3,4,5,6,7
                    ]
                }]
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

    }
    handleClick(){
        this.show = true
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
                    <Button bsStyle="primary" bsSize="large" onClick={this.handleClick.bind(this)}>Get Statiscts</Button>
                <h1>we got stuff.
                    {this.state.monthly}
                </h1>
                    {this.show ? <BarChart data={this.data}  options={options}/> : <h5>Loading statistics may take a while.</h5>}

                </div>
            )

        }
    }

}