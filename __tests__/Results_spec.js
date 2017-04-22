/**
 * Created by jan on 20/04/2017.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import Results from '../src/components/Courses/Results.js';
import TestUtils from "react-addons-test-utils"
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

        },
        oldGoals:{
        daily: {
            goal: 0,
            timeSet:0,
            timeSpent:0
        },
            weekly: {
                goal: 0,
                timeSet:0,
                timeSpent:0
            },
            monthly: {
                goal: 0,
                timeSet:0,
                timeSpent:0
            }
        }
    };
const coursesNull=null;

describe("Results", function () {
    let renderer2;
    let component2;
    renderer2 = TestUtils.createRenderer();
    renderer2.render(
        <Results courseID={'TES1000'} course={courses} view={'Daily Goals'}/>
    );
    component2 = renderer2.getRenderOutput();
    it("Daily", () => {
        expect(component2).toMatchSnapshot();
    });
    renderer2 = TestUtils.createRenderer();
    renderer2.render(
        <Results courseID={'TES1000'} course={courses} view={'Weekly Goals'}/>
    );
    component2 = renderer2.getRenderOutput();
    it("Weekly", () => {
        expect(component2).toMatchSnapshot();
    });
    renderer2 = TestUtils.createRenderer();
    renderer2.render(
        <Results courseID={'TES1000'} course={courses} view={'Monthly Goals'}/>
    );
    component2 = renderer2.getRenderOutput();
    it("Monthly", () => {
        expect(component2).toMatchSnapshot();
    });
});