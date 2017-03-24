import React, { Component } from 'react'

export default class FeedbackMessage extends Component{

    constructor(props){
        super(props);
        this.state = {
            active: this.props.active,
            message: this.props.message,
            positive: this.props.positive,
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            active: nextProps.active,
            message: nextProps.message,
            positive: nextProps.positive,
        })
    }

    render(){
        if(this.state.active){
            if(this.state.positive){
                return(
                    <h4 style={{color: 'green'}}>{this.state.message}</h4>
                );
            }
            else{
                return(
                    <h4 style={{color: 'red'}}>{this.state.message}</h4>
                );
            }
            
        }
        else{
            return(
                <div></div>
            )
        }
    }

}