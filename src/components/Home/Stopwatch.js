import React, { Component } from 'react';
import Progress from 'react-progressbar';
import {ref } from '../../config/constants'
import firebase from 'firebase';
import {Button, ProgressBar, ListGroup, Grid,Col,Row} from 'react-bootstrap'
import PlannedSession from './PlannedSession'
import AddSession from './AddSession'

const formattedSeconds = ((sec) => //formats to hh:mm:ss
Math.floor (sec/3600)+ ':' + Math.floor(sec / 60) + '.' + ('0' + sec % 60).slice(-2));


class Stopwatch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            secondsElapsed: 0,
            lastClearedIncrementer: null,
            goal: 400,
            desc: ""
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
            goal: 400,
            emne: this.props.emne,
            theme: undefined
        })
        this.incrementer = null;
        this.started = false
        console.log(this.props.emne)

    }
    handleResetClick() {
        this.castToFirebase();
        clearInterval(this.incrementer);
    }
    onChildChanged(newState){
        console.log(newState)
        this.setState({theme:newState})

    }

    render() {
        return (
            <Grid fluid={true}>
                <Row>
                    <Col md={7}>
            <div className="stopwatch" >
                <h4>Planned Session: {this.state.theme}</h4>
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
                            <Button block className="btn btn-lg" onClick={this.handleResetClick.bind(this)}>save</Button></div>
                        : null
                )}

            </div><div>
                        <AddSession courseID = {this.props.emne}/>
                    </div>

                    </Col>
                    <Col md={1}/>
            <Col md={4}>

                <div>
                    <PlannedSession emne={this.props.emne} callbackParent={(newState) => this.onChildChanged(newState) }/>
                </div>
</Col>
                </Row>
            </Grid>
        );
    }
}


export default Stopwatch;

