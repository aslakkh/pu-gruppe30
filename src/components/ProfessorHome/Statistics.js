/**
 * Created by jan on 21/03/2017.
 */
import React, { Component } from 'react'
import firebase from 'firebase';
import {ref } from '../../config/constants'
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



export default class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state={
            courseID: this.props.courseID,

        }
    }

    componentWillMount(){
        this.getDataFromFirebase()
    }

    getDataFromFirebase(){
        console.log(this.state.courseID)
        let that = this
        let kurs = this.state.courseID
        let ting = []
        let sessions = []
        let messageRef = firebase.database().ref();
        messageRef.child('users/').on('child_added', function(snapshot) {
            if(snapshot.val().courses[kurs] != undefined && snapshot.val().courses[kurs]['sessions']) {
                ting.push(snapshot.val().courses[kurs]['sessions'])
                ting.forEach(function (session) {



                })
            }

        })
    }


    render() {
        return (
            <h1>{console.log(this.state.time)}</h1>

        )
    }

}