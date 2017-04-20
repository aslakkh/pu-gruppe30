
import React, { Component } from 'react';
import './stopwatch.css';
import Progress from 'react-progressbar';
import {ref } from '../../config/constants'
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.css'
import {ProgressBar} from 'react-bootstrap'


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
        const tid = this.state.time;
        const userUid = firebase.auth().currentUser.uid;
        const timeRef = ref.child('users/'+userUid+'/courses/'+this.state.emne+'/sessions/'+ Date.now());
        timeRef.update({time:this.state.secondsElapsed+this.state.time});
        this.setState({
            secondsElapsed: 0,
            time: tid+this.state.secondsElapsed
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
            goal: 40,
            emne: this.props.emne,
            time: this.props.course.time
        });
        this.incrementer = null;
        this.started = false

    }
    handleResetClick() {
        this.castToFirebase();
        clearInterval(this.incrementer);
    }

    setProgressColor(goal,time){
        if(this.state.secondsElapsed+time > (goal)/1.6){
            return("success")
        }
        else if (this.state.secondsElapsed+time > (goal)/2.8){
            return("warning")

        }
        else{
            return("danger")
        }
    }

    setProgressNow(time,boo,vari){
        if(boo){
            if(this.state.secondsElapsed+time > this.state.goal/vari){
                return this.state.goal/vari
            }
            else{
                return this.state.secondsElapsed+time
            }
        }
        else{
            if(this.state.secondsElapsed+time > this.state.goal*vari){
                return this.state.goal*vari
            }
            else{
                return this.state.secondsElapsed+time
            }
        }
    }

    render() {
        return (
            <div className="stopwatch">
                <h3>Total time spent:{formattedSeconds(this.state.secondsElapsed+this.state.time)}</h3>
                <h3>Daily progress</h3>
                <ProgressBar>
                    <ProgressBar label={formattedSeconds(this.state.secondsElapsed)} bsStyle={this.setProgressColor(this.state.goal/5,0)} now={this.setProgressNow(0,true,5)} max={this.state.goal/5}/>
                </ProgressBar>
                <h3>Weekly progress</h3>
                <ProgressBar>
                    <ProgressBar label={formattedSeconds(this.state.secondsElapsed+this.state.time)} bsStyle={this.setProgressColor(this.state.goal,this.state.time)} now={this.setProgressNow(this.state.time,true,1)} max={this.state.goal}/>
                </ProgressBar>
                <h3>Monthly progress</h3>
                <ProgressBar>
                    <ProgressBar label={formattedSeconds(this.state.secondsElapsed+this.state.time)} bsStyle={this.setProgressColor(this.state.goal*4,this.state.time)} now={this.setProgressNow(this.state.time,false,4)} max={this.state.goal*4}/>
                </ProgressBar>
                <h1 className="progressbar">
                    <Progress color={'#000000'} completed={(this.state.secondsElapsed >= this.state.goal) ? 100 : ((this.state.secondsElapsed+this.state.time)/this.state.goal) * 100}>
                    </Progress>
                </h1>
            </div>

        );
    }
}

/** verbose component before 0.14
 class Button extends React.Component {
  render() {
    return <button type="button" {...this.props}
                   className={"btn " + this.props.className } />;
  }
}
 */

export default Stopwatch;