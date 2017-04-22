import React, { Component } from 'react'
import {ListGroup, Panel, ListGroupItem, Button, Modal, FormGroup, FormControl} from 'react-bootstrap'
import {removeCourseFromRoot, addCourseToRoot, courseExistsAtRoot, saveCourse} from '../../helpers/auth.js'
import firebase from 'firebase'
import FeedbackMessage from '../FeedbackMessage'
import {styles} from './ManageCoursesStyles.js'

/* 
    Renders ListGroup, FormGroup, Modal, FeedbackMessage-component
    ManageCourses displays all courses in database
    Professor can add new courses and remove courses permanently from database
    Professor can add courses to "my courses"
    
*/
export default class ManageCourses extends Component{


    constructor(props){
        super(props);

        //BINDINGS
        this.handleAddToMyCourses = this.handleAddToMyCourses.bind(this);
        this.handleAddCourse = this.handleAddCourse.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.searchCourses = this.searchCourses.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this.state = {
            courses: this.props.courses,
            allCourses: this.props.courses,
            modalWarning: "Warning",
            inputValue: "",
            displayFeedbackMessage: false,
            feedbackMessage: "", //passed to FeedbackMessage component
            feedbackMessagePositive: false,
        }
    }

    componentWillMount(){
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

    componentWillUnmount(){
        let coursesRef = firebase.database().ref().child('courses/');
        coursesRef.off();
    }

    componentWillUpdate(){
    }

    //handles add to my courses-button
    handleAddToMyCourses(course,e){
        e.preventDefault();
        //add to users courses in firebase
        saveCourse(course);
        this.setState({
                    displayFeedbackMessage: true,
                    feedbackMessage: course + " has been added to your courses!",
                    feedbackMessagePositive: true,
        });
    }

    //handles add to firebase/courses
    handleAddCourse(e){
        e.preventDefault();
        if(this.getValidationState() === 'success'){
            //save to courses
            if(courseExistsAtRoot(this.state.inputValue)){
                this.setState({
                    displayFeedbackMessage: true,
                    feedbackMessage: "Course already exists in database!",
                    feedbackMessagePositive: false,
                });
            }
            else{ 
                addCourseToRoot(this.state.inputValue);
                this.setState({
                    displayFeedbackMessage: true,
                    feedbackMessage: this.state.inputValue + " added to courses!",
                    feedbackMessagePositive: true,
                });
            }
            
        }
        else{
            this.setState({
                    displayFeedbackMessage: true,
                    feedbackMessage: "Course code must be two or three letters followed by four numbers.",
                    feedbackMessagePositive: false,
                });
            console.log("Error: Tried submitting invalid value: " + this.state.inputValue);
        }
    }

    //validates input textfield
    getValidationState(){
        var length = this.state.inputValue.length;
        var re = /^[A-Z]{2,3}[0-9]{4}$/;

        if(re.test(this.state.inputValue)){
            return 'success';
        }else if(length > 0){
            return 'warning';
        }
    }

    //handles delete button
    handleDelete(course){
        //popup with warning that this will delete course from database, removing all course information
        //remove course from database
        removeCourseFromRoot(course);
        this.close();
    }

    handleChange(e){
        
        var text = e.target.value.toUpperCase();
        if(text.trim() === ""){ //if input form text is empty, set courses to all courses in database
            this.setState({
                inputValue: text,
                courses: this.state.allCourses,
                displayFeedbackMessage: false,
            });
        }
        else{ //use array filter to find courses matching input form text
            this.setState({
                inputValue: text,
                courses: this.state.allCourses.filter(this.searchCourses(text)),
                displayFeedbackMessage: false,
            });
        }
    }

    handleKeyPress(e){
        if(e.key === 'Enter'){
            e.preventDefault();
            e.stopPropagation();
            this.handleAddCourse(e);
        }
    }

    //used with array.filter() in handleChange-method
    //returns filter function to allow passing of parameter to filter function
    searchCourses(text){
        return function filter(value){
            return (value.search(text) !== -1);
        }
    }

    //functions to control Modal
    getInitialState() {
    return { showModal: false };
    }

    close(){
        this.setState({ showModal: false });
    }

    open(course){
        let warningString = "";
        warningString += "Performing this action will permanently remove the course ";
        warningString += course;
        warningString += ". All information related to this course will be removed from the system. Student data will not be affected. ";

        this.setState({ 
            showModal: true,
            activeCourse: course,
            modalWarning: warningString,
    });
    }


    render(){
        if(this.state.courses === null || this.state.courses === undefined){
            return(
                <h4>No courses in database</h4>
            )
        }
        else{
            return(
            <div>
                <h5>Here you can add and remove courses from the database. </h5>
                <h5>You can also add a course to the list of courses you manage.</h5>

                <div style={styles.FormWrapper}>
                    <FormGroup validationState={this.getValidationState()}>
                        <FormControl
                        id='searchBar'
                        componentClass='input'
                        value={this.state.inputValue}
                        type="text"
                        placeholder="Search"
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                        />
                        <FormControl.Feedback/>
                    </FormGroup>
                    <Button type="submit" bsStyle="primary" onClick={this.handleAddCourse} style={styles.Button}>Add Course </Button>
                </div>
                <FeedbackMessage active={this.state.displayFeedbackMessage} message={this.state.feedbackMessage} positive={this.state.feedbackMessagePositive}/>
                
                <Panel style={styles.ListPane}>
                    <ListGroup style={styles.ListGroup}>
                        {(this.state.courses).map((key) => {
                            return <ListGroupItem key={key} style={styles.List}>
                                <div style={styles.CourseName}>{key}</div>
                            <Button style={styles.Button} bsStyle="success" onClick={(e) => this.handleAddToMyCourses(key, e)}>Add to My Courses</Button>
                            <Button style={styles.Button} bsStyle="danger" onClick={() => this.open(key)}>Delete</Button>
                            </ListGroupItem>
                        })}
                        
                    </ListGroup>
                </Panel>
                
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton style={styles.ModalHeader}>
                        <Modal.Title style={styles.ModalTitle}>Warning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>{this.state.modalWarning}
                        </h4>
                        <p>
                            Are you sure you want to delete this course?
                        </p>
                        <Button style={styles.Button} bsStyle="success" onClick={() => this.handleDelete(this.state.activeCourse)}>Yes</Button>
                        <Button style={styles.Button} bsStyle="danger" onClick={this.close}>No</Button>
                    </Modal.Body>
                </Modal>
            </div>
        );
        }
        
    }
}