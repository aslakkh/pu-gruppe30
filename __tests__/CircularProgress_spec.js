/**
 * Created by jan on 20/04/2017.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import CircularProgress from '../src/components/Courses/CircularProgress.js';
import TestUtils from "react-addons-test-utils"
jest.useFakeTimers();
Date.getTime = jest.fn(() => 1482363367071);
Date.now = jest.fn(() => 1482363367071);
const courses={
    active: true,
        goals: {dailyGoal:{active: false,
            timeSet: 3600,
            timeSpent: 600,
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

describe("Circular", function () {
    let renderer2;
    let component2;
    renderer2 = TestUtils.createRenderer();
    renderer2.render(
        <CircularProgress courseID={'TES1000'} course={courses}/>
    );
    component2 = renderer2.getRenderOutput();
    it("One course", () => {
        expect(component2).toMatchSnapshot();
    });
});