import React, { Component } from 'react';
import './results.css'
import {DropdownButton, MenuItem} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {secondsToString, formatDate } from '../../helpers/helperFunctions';
import { removeOldGoal } from '../../helpers/auth'


let dayRowDict = {};
let weekRowDict = {};
let monthRowDict = {};

let toDelete = [];

export default class Results extends Component {

    constructor(props) {
        super(props);
        this.state = {
            course: this.props.course,
            courseID: props.courseID,
            view: "Daily Goals",
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            view: nextProps.view,
            course: nextProps.course,
            courseID: nextProps.courseID,
            view: this.state.view,
        })
    }


    componentDidMount() {
        toDelete = [];
    }

    componentWillUnmount() {
        /*
         Iterates toDelete-list, fetches the key to oldGoal in firebase and deletes the entry in OldGoals.
         Data is deleted from firebase on component unmount.
         */
        for (let i = 0; i < toDelete.length; i++) {
            for(let key in dayRowDict) {
                if (key === toDelete[i]) {
                    removeOldGoal(this.state.courseID, "daily", dayRowDict[key]);
                    delete dayRowDict[key];

                }
            }
            for(let key in weekRowDict) {
                if (key === toDelete[i]) {
                    removeOldGoal(this.state.courseID, "weekly", weekRowDict[key]);
                    delete dayRowDict[key];
                }
            }
            for(let key in monthRowDict) {
                if (key === toDelete[i]) {
                    removeOldGoal(this.state.courseID, "monthly", monthRowDict[key]);
                    delete dayRowDict[key];
                }
            }
        }

    }


    createTableRows() {
        // Information on old goals is fetched from firebase based on current view (daily, weekly, monthly) and stored
        // in goalList.
        let rows = [];
        let goalList;
        if (this.state.view === "Daily Goals") {
            goalList = this.state.course.oldGoals.daily;
        } else if (this.state.view === "Weekly Goals") {
            goalList = this.state.course.oldGoals.weekly;
        } else {
            goalList = this.state.course.oldGoals.monthly;
        }


        //Iterates through goalList, formats information to be displayed in result-table.

        {Object.keys(goalList).map((key) => {
            if (key !== 1) {
                let date = formatDate(new Date(goalList[key].timeSet));

                let idString = date[5] + "/" + date[2] + "-" + date[0] + " " + date[6] + ":" + date[7] + ":" + date[8];

                let goal = goalList[key].goal;
                let timeSpent = goalList[key].timeSpent;
                let spanString = "";
                if (this.state.view === "Daily Goals") {
                    spanString = date[5] + "/" + date[2] + "/" + date[0];
                    dayRowDict[idString] = key;
                } else if (this.state.view === "Weekly Goals") {
                    spanString = "Week " + date[3] + ", " + date[0];
                    weekRowDict[idString] = key;
                } else {
                    spanString = date[1] + ", " + date[0];
                    monthRowDict[idString] = key;
                }

                let percent = Math.floor((timeSpent / goal) * 100);
                if (percent > 100) percent = 100;
                let goalString = secondsToString(goal);
                let timeSpentString = secondsToString(timeSpent);
                if (timeSpentString === "") timeSpentString = "-";
                rows.push({
                    id: idString,
                    set: spanString,
                    goal: goalString,
                    spent: timeSpentString,
                    percent: percent,
                })

            }
        })}
        return rows.reverse();
    }

    onAfterDeleteRow(rowKeys) {
        //adds rows to delete in toDelete-list
        while (rowKeys.length !== 0) {
            let element = rowKeys[0];
            toDelete.push(element);
            rowKeys.splice(0,1);
        }

    }

    handleDropdownClick(view) {
        this.setState({view: view})
    }

    render() {
        const selectRowProp = {
            mode: 'checkbox',
            bgColor: '#CEE3F6',
        };

        const options = {
            afterDeleteRow: this.onAfterDeleteRow,
        };

        let rows = this.createTableRows();
        return(

            <div className="table-module">
                <DropdownButton className="info-dropdown" bsStyle="primary" title={this.state.view} key={0} id={0}>
                    <MenuItem eventKey="1" onClick={() => this.handleDropdownClick('Daily Goals')}>Daily Goals</MenuItem>
                    <MenuItem eventKey="2" onClick={() => this.handleDropdownClick('Weekly Goals')}>Weekly Goals</MenuItem>
                    <MenuItem eventKey="3" onClick={() => this.handleDropdownClick('Monthly Goals')}>Monthly Goals</MenuItem>
                </DropdownButton>

                <BootstrapTable data={ rows } options={ options } selectRow={ selectRowProp } deleteRow={ true }>
                    <TableHeaderColumn className="column" dataField='id' isKey={ true } dataSort>Goal set</TableHeaderColumn>
                    <TableHeaderColumn className="column" dataField='set'>Span</TableHeaderColumn>
                    <TableHeaderColumn className="column" dataField='goal'>Goal</TableHeaderColumn>
                    <TableHeaderColumn className="column" dataField='spent'>Time spent</TableHeaderColumn>
                    <TableHeaderColumn className="column" dataField='percent'>% completed</TableHeaderColumn>

                </BootstrapTable>

            </div>

        );
    }
}