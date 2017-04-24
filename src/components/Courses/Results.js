/**
 * Created by anderssalvesen on 08.04.2017.
 */
import React, { Component } from 'react';
import './results.css'
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
            view: props.view,
        };

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            view: nextProps.view,
            course: nextProps.course,
            courseID: nextProps.courseID,
        })
    }


    componentDidMount() {
        toDelete = [];
    }

    componentWillUnmount() {
        /*
         Iterates toDelete-list, fetches the key to oldGoal and firebase and deletes the entry in OldGoals.
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
        let rows = [];
        let goalList;
        if (this.state.view === "Daily Goals") {
            goalList = this.state.course.oldGoals.daily;
        } else if (this.state.view === "Weekly Goals") {
            goalList = this.state.course.oldGoals.weekly;
        } else {
            goalList = this.state.course.oldGoals.monthly;
        }

        {Object.keys(goalList).map((key) => {
            if (key != 1) {
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
        /*
         adds rows to delete in toDelete-list
         */

        while (rowKeys.length != 0) {
            let element = rowKeys[0];
            toDelete.push(element);
            rowKeys.splice(0,1);
        }

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