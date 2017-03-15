/**
 * Created by anderssalvesen on 23.02.2017.
 */
import React, { Component } from 'react';
import './stopwatch.css';
import Progress from 'react-progressbar';
import {ref } from '../../config/constants'
import firebase from 'firebase';


const formattedSeconds = ((sec) => //formats to hh:mm:ss
Math.floor (sec/3600)+ ':' + Math.floor(sec / 60) + '.' + ('0' + sec % 60).slice(-2))


class Stopwatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsElapsed: 0,
            lastClearedIncrementer: null,
            goal: 400,
            time: this.props.course.time
        };
        this.incrementer = null;
        this.started = false
    }

    castToFirebase(){
        const tid = this.state.time
    const userUid = firebase.auth().currentUser.uid;
    const timeRef = ref.child('users/'+userUid+'/courses/'+this.state.emne+'/sessions/'+ Date.now())
    timeRef.update({time:this.state.secondsElapsed+this.state.time})
    this.setState({
        secondsElapsed: 0,
        time: tid+this.state.secondsElapsed
    })
}
    handleStartClick() {
                if(!this.started){ //Makes sure the button isnt clicked twice
            this.started = true
        this.incrementer = setInterval( () =>
                this.setState({
                    secondsElapsed: this.state.secondsElapsed + 1
                })
            , 1000);}
    }

    handleStopClick() {
        this.started = false
        clearInterval(this.incrementer);
        this.setState({
            lastClearedIncrementer: this.incrementer
        });
    }




    componentWillMount(){
        this.setState ({
            secondsElapsed: 0,
            lastClearedIncrementer: null,
            goal: 400,
            emne: this.props.emne,
            time: this.props.course.time
        })
        this.incrementer = null;
        this.started = false

    }
    handleResetClick() {
        this.castToFirebase()
        clearInterval(this.incrementer);
    }

    render() {
        return (
            <div className="stopwatch">
                <h3>Total time spent:{formattedSeconds(this.state.secondsElapsed+this.state.time)}</h3>
                <h1 className="progressbar">
                    <Progress color={'#000000'} completed={(this.state.secondsElapsed >= this.state.goal) ? 100 : ((this.state.secondsElapsed+this.state.time)/this.state.goal) * 100}>
                    </Progress>
                </h1>
                <h1 className="app-timer">{formattedSeconds(this.state.secondsElapsed)}</h1>

                {(this.state.secondsElapsed === 0 ||
                    this.incrementer === this.state.lastClearedIncrementer
                        ? <Button className="start-btn" onClick={this.handleStartClick.bind(this)}>start</Button>
                        : <Button className="stop-btn" onClick={this.handleStopClick.bind(this)}>stop</Button>
                )}

                {(this.state.secondsElapsed !== 0 &&
                    this.incrementer === this.state.lastClearedIncrementer
                        ? <Button onClick={this.handleResetClick.bind(this)}>save</Button>
                        : null
                )}

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

const Button = (props) =>
    <button type="button" {...props} className={"Stopwatch-btn " + props.className } />;

export default Stopwatch;

