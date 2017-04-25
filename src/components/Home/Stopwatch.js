/**
 * Created by anderssalvesen on 23.02.2017.
 */
import React, { Component } from 'react';
import {ref } from '../../config/constants'
import firebase from 'firebase';
import {Button, Grid,Col,Row} from 'react-bootstrap'
import PlannedSession from './PlannedSession'
import AddSession from './AddSession'
import {styles} from './StopwatchStyles.js'

/*
Format from seconds to hh:mm:ss
 */
const formattedSeconds = ((sec) => //formats to hh:mm:ss
Math.floor (sec/3600)+ ':' + Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2));


class Stopwatch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emne: this.props.emne,
            course: this.props.course,
            secondsElapsed: 0,
            lastClearedIncrementer: null,
            goal: 400,
            desc: "",
            focus:false,
            key: null
        };
        this.incrementer = null;
        this.started = false
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            emne: nextProps.emne,
            course: nextProps.course,
        })
    }

    /*
    Sends the time spent to firebase
     */
    castToFirebase(){

    const userUid = firebase.auth().currentUser.uid;
    const timeRef = ref.child('users/'+userUid+'/courses/'+this.state.emne+'/sessions/'+ Date.now());
    timeRef.set({time:this.state.secondsElapsed,desc: this.state.desc.value});
    this.setState({
        secondsElapsed: 0
    });
    console.log(this.state.key)
        console.log(this.state.desc.value)
        if(this.state.key !== null){
        const planRef = ref.child('users/'+userUid+'/courses/'+this.state.emne+'/plannedSessions/'+ this.state.key);
        planRef.remove();
        }
}
/*
Starts the timer
 */
    handleStartClick() {
        if(!this.started){ //Makes sure the button isnt clicked twice
            this.started = true;
            this.incrementer = setInterval( () =>
                this.setState({
                    secondsElapsed: this.state.secondsElapsed + 1,
                    focus:true
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
            goal: 400,
            emne: this.props.emne,
            theme: undefined
        });
        this.incrementer = null;
        this.started = false;

    }
    handleResetClick() {
        this.castToFirebase();
        clearInterval(this.incrementer);
    }

    /*
    Gets the selected planned session, if selected
     */
    onChildChanged(newState,newState2){
        this.setState({
            theme:newState,
            key: newState2
        })

    }

    render() {
        return (
            <Grid fluid={true}>
                <Row>
                    <Col md={7}>
            <div style={styles.margin}>
                {this.state.theme === undefined ? null : <h4>Planned Session: {this.state.theme}</h4>}
                <div style={styles.timer}>{formattedSeconds(this.state.secondsElapsed)}</div>

                {(this.state.secondsElapsed === 0 ||
                    this.incrementer === this.state.lastClearedIncrementer
                        ? <Button block style={styles.center} className="btn btn-lg" bsStyle="primary" onClick={this.handleStartClick.bind(this)}>Start</Button>
                        : <Button block style={styles.center} className="btn btn-lg" bsStyle="primary" onClick={this.handleStopClick.bind(this)}>Stop</Button>
                )}

                {(this.state.secondsElapsed !== 0 &&
                    this.incrementer === this.state.lastClearedIncrementer
                        ? <div style={styles.margin}>  <form><label >What did you do?{this.state.desc}</label>
                            <input autoFocus={this.state.focus} className="form-control" ref={(desc) => this.state.desc = desc} placeholder="Description"/>
                                </form>
                            <Button style={styles.margin}  block className="btn btn-lg" bsStyle="primary" onClick={this.handleResetClick.bind(this)}>save</Button></div>
                        : null
                )}

            </div><div>
                        <AddSession courseID={this.state.emne}/>
                    </div>

                    </Col>
                    <Col md={1}/>
            <Col md={4}>

                <div>
                    <PlannedSession course={this.state.course} emne={this.state.emne} callbackParent={(newState,newState2) => this.onChildChanged(newState, newState2) }/>
                </div>
</Col>
                </Row>
            </Grid>
        );
    }
}


export default Stopwatch;

