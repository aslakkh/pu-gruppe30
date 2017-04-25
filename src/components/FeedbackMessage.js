import React, { Component } from 'react'
import {Alert} from 'react-bootstrap'

export default class FeedbackMessage extends Component{

    constructor(props){
        super(props);
        this.state = {
            active: this.props.active,
            message: this.props.message,
            bsStyle: this.props.bsStyle,
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            active: nextProps.active,
            message: nextProps.message,
            bsStyle: nextProps.bsStyle,
        })
    }

    render(){
        if(this.state.active){
            return(
                <Alert bsStyle={this.state.bsStyle}>
                    {this.state.message}
                </Alert>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }

}