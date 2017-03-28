import React, {Component} from 'react'
import { saveCourse } from '../../helpers/auth'
import {Modal, Panel, FormGroup, FormControl, Button, HelpBlock, ListGroup, ListGroupItem} from 'react-bootstrap'
import firebase from 'firebase'
import AddCourse from './AddCourse'
import './AddCourseModal.css'

export default class AddCourseModal extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.close = this.close.bind(this);
        this.state = {
            showModal: this.props.showModal,
            courses: [],
            allCourses: [],
            value: '',
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            showModal: nextProps.showModal,
        })
    }

    componentDidMount(){
        let that = this;
        let coursesRef = firebase.database().ref().child('courses/');
        coursesRef.on('value', snap => {
            var temp = snap.val();
            var coursesArray = Object.keys(temp).map(key => key); //create array from key values from database
            that.setState({
                allCourses: coursesArray,
                courses: coursesArray,
            });
        });
    }

    //required to use Modal. uses function closeModal received through props
    close(){
        this.props.closeModal();
        //this.setState({ showModal: false });
    }

    handleAddToMyCourses(course,e){
        e.preventDefault();
        //add to users courses in firebase
        saveCourse(course);
        /*this.setState({
                    displayFeedbackMessage: true,
                    feedbackMessage: course + " has been added to your courses!",
                    feedbackMessagePositive: true,
        });*/
    }

    handleChange(e){
        // this.setState({value: e.target.value.toUpperCase()});
        var text = e.target.value.toUpperCase();
        if(text.trim() === ""){ //if input form text is empty, set courses to all courses in database
            this.setState({
                value: text,
                courses: this.state.allCourses,
            });
        }
        else{ //use array filter to find courses matching input form text
            this.setState({
                value: text,
                courses: this.state.allCourses.filter(this.searchCourses(text)),
            });
        }
        
    }

    //used with array.filter() in handleChange-method
    //returns filter function to allow passing of parameter to filter function
    searchCourses(text){
        return function filter(value){
            return (value.search(text) !== -1);
        }
    }


    render(){
        return(
            <Modal 
            show={this.state.showModal} 
            onHide={this.close}
            dialogClassName="AddCourseModal"
            >
                <Modal.Header closeButton >
                    <Modal.Title>Add course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="ModalBodyWrapper">
                        <div className="ModalBodyLeft">
                            <h4>Add existing course <img src={require("../../assets/helpicon.png")} alt="helpicon" height="20" width="20"/></h4>
                            
                            <FormGroup controlId="addCourseForm">
                                <FormControl 
                                id="addCourseForm" 
                                componentClass='input'
                                value={this.state.value}
                                className="InputForm" 
                                type="text" 
                                placeholder="Search"
                                onChange={this.handleChange}
                                onKeyPress={this.handleKeyPress}
                                
                                />
                                <FormControl.Feedback/>
                                <HelpBlock>Enter course code (up to three letters followed by four digits)</HelpBlock>
                            </FormGroup>
                            <Panel className="ModalPane">
                                <ListGroup className="ModalList">
                                    {(this.state.courses).map((key) => {
                                        return <ListGroupItem key={key} className="List">
                                            <div className="CourseName">{key}</div>
                                            <Button className="Button" bsStyle="success" onClick={(e) => this.handleAddToMyCourses(key, e)}>Add to My Courses</Button>
                                        </ListGroupItem>
                                    })}
                    
                                </ListGroup>
                            </Panel>

                        </div>
                        <div className="ModalBodySeparator" />
                        <div className="ModalBodyRight">
                            <h4>Add new course</h4>
                            <AddCourse/>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )
        
    }
}