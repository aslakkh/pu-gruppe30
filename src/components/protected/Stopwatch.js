/**
 * Created by anderssalvesen on 23.02.2017.
 */
import React, { Component } from 'react';
import './stopwatch.css';
import Progress from 'react-progressbar';


const formattedSeconds = (sec) =>
Math.floor(sec / 60) +
':' +
('0' + sec % 60).slice(-2)

function getFromFirebase(){

}

function castToFirebase(){

}

class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsElapsed: 0,
            lastClearedIncrementer: null,
            goal: 5
        };
        this.incrementer = null;
        this.started = false
    }

    handleStartClick() {
                if(!this.started){
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

    handleResetClick() {
        

        clearInterval(this.incrementer);
        let sec = this.state.secondsElapsed;

        this.setState({
            secondsElapsed: 0,
        });
    }

    render() {
        return (
            <div className="stopwatch">
                <h1 className="progressbar">
                    <Progress completed={(this.state.secondsElapsed >= this.state.goal) ? 100 : (this.state.secondsElapsed/this.state.goal) * 100}>
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

