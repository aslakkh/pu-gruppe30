/**
 * Created by anderssalvesen on 23.02.2017.
 */
import React, { Component } from 'react';
import Progress from 'react-progressbar';
import {ref } from '../../config/constants'
import firebase from 'firebase';
import {Button, ProgressBar} from 'react-bootstrap'

const formattedSeconds = ((sec) => //formats to hh:mm:ss
Math.floor (sec/3600)+ ':' + Math.floor(sec / 60) + '.' + ('0' + sec % 60).slice(-2));


class Stopwatch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            secondsElapsed: 0,
            lastClearedIncrementer: null,
            goal: 20,
            time: this.props.course.time,
            progressColor: null
        };
        this.incrementer = null;
        this.started = false
    }

    castToFirebase(){
        console.log("desc");
        console.log(this.state.desc.value);
    const userUid = firebase.auth().currentUser.uid;
    const timeRef = ref.child('users/'+userUid+'/courses/'+this.state.emne+'/sessions/'+ Date.now());
    timeRef.set({time:this.state.secondsElapsed,desc: this.state.desc.value});
    this.setState({
        secondsElapsed: 0
    })
}
    handleStartClick() {
        if(!this.started){ //Makes sure the button isnt clicked twice
            this.started = true;
            this.incrementer = setInterval( () =>
                this.setState({
                    secondsElapsed: this.state.secondsElapsed + 1
                })
            , 1000);}
    }

    handleStopClick() {
        this.started = false;
        clearInterval(this.incrementer);
        this.setState({
            lastClearedIncrementer: this.incrementer
        });
    }




    componentWillMount(){
        this.setState ({
            secondsElapsed: 0,
            lastClearedIncrementer: null,
            goal: 20,

            emne: this.props.emne,
            time: this.props.course.time,
            monthTime:this.monthTime+this.props.course.time
        })
        this.incrementer = null;
        this.started = false

    }
    handleResetClick() {
        this.castToFirebase();
        clearInterval(this.incrementer);
    }

    setProgressColor(goal){
        if(this.state.secondsElapsed > (goal)/1.6){
            return("success")
        }
        else if (this.state.secondsElapsed > (goal)/2.8){
            return("warning")

        }
        else{
            return("danger")
        }
    }

    render() {
        return (
            <div className="stopwatch">
                <h1 className="progressbar">
                    Daglig
                    <ProgressBar now={this.state.secondsElapsed} bsStyle={this.setProgressColor(this.state.goal/5)} label={formattedSeconds(this.state.secondsElapsed)} max={50}/>
                    Ukentlig
                    <ProgressBar now={this.state.secondsElapsed+this.state.time} bsStyle={this.setProgressColor(this.state.goal)} label={formattedSeconds(this.state.secondsElapsed+this.state.time)} max={100}/>
                    Månedlig
                    <ProgressBar now={this.state.secondsElapsed+this.state.monthTime} bsStyle={this.setProgressColor(this.state.goal*4)} label={formattedSeconds(this.state.secondsElapsed)} max={200}/>


                </h1>
                <h1 className="app-timer">{formattedSeconds(this.state.secondsElapsed)}</h1>

                {(this.state.secondsElapsed === 0 ||
                    this.incrementer === this.state.lastClearedIncrementer
                        ? <Button block className="btn btn-lg" onClick={this.handleStartClick.bind(this)}>start</Button>
                        : <Button block className="btn btn-lg" onClick={this.handleStopClick.bind(this)}>stop</Button>
                )}

                {(this.state.secondsElapsed !== 0 &&
                    this.incrementer === this.state.lastClearedIncrementer
                        ? <div>  <form><label>What did you do?{this.state.desc}</label>
                            <input className="form-control" ref={(desc) => this.state.desc = desc} placeholder="Description"/>
                                </form>
                            <Button block className="btn" onClick={this.handleResetClick.bind(this)}>save</Button></div>
                        : null
                )}

            </div>

        );
    }
}


export default Stopwatch;

