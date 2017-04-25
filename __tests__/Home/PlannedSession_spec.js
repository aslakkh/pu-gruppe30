/**
 * Created by jan on 19/04/2017.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import PlannedSession from '../../src/components/Home/PlannedSession.js';
import TestUtils from "react-addons-test-utils"
import firebase from 'firebase'
import render from 'enzyme'
//state.sessions = jest.fn(() => {return {1492786690143: {goal: "grsg"}}});
const courses={
    active: true,
        goals: {dailyGoal:{active: false,
            timeSet: 0,
            timeSpent: 0,
            value: 0},
            monthlyGoal:
                {active:false,
                    timeSet:0,
                    timeSpent:0,
                    value:0},
            weeklyGoal:
                {active:false,
                    timeSet:0,
                    timeSpent:0,
                    value:0}
        }
        ,
        plannedSessions:{
            1493219881898:{
                goal: "hello"
            },
            1493219881000:{
                goal: "hello"
            }
        }

    };
const courses2={
    active: true,
    goals: {dailyGoal:{active: false,
        timeSet: 0,
        timeSpent: 0,
        value: 0},
        monthlyGoal:
            {active:false,
                timeSet:0,
                timeSpent:0,
                value:0},
        weeklyGoal:
            {active:false,
                timeSet:0,
                timeSpent:0,
                value:0}
    }


};
const coursesNull=null;
describe("Stopwatch", function () {
    const spy = jest.fn();

    it('Welcome renders hello world', () => {
        const component = renderer.create(<PlannedSession course={courses2} emne={"TES1000"} callbackParent={(newState, newState2) => spy(newState, newState2)}/>);
        const json = component.toJSON();
        expect(json).toMatchSnapshot();
    });

    let renderer2;
    let component2;
    renderer2 = TestUtils.createRenderer();
    renderer2.render(
        <PlannedSession course={courses} emne={"TES1000"} callbackParent={(newState) => this.onChildChanged(newState) }/>
    );
    component2 = renderer2.getRenderOutput();
    it("One course", () => {
        expect(component2).toMatchSnapshot();
    });
    renderer2.render(
        <PlannedSession course={courses} emne={"TDT4100"} callbackParent={(newState) => this.onChildChanged(newState) }/>
    );
    component2 = renderer2.getRenderOutput();
    it("new course", () => {
        expect(component2).toMatchSnapshot();
    });

});