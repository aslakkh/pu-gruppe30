/**
 * Created by jan on 25/04/2017.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import CourseInformation from '../../src/components/Courses/CourseInformation.js';
import TestUtils from "react-addons-test-utils"
import {shallow} from 'enzyme';

const courses={
    TES1000:{active: true,
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
    }};
const coursesNull=null;
describe("CourseInformation", function () {
    let renderer2;
    let component2;
    renderer2 = TestUtils.createRenderer();
    renderer2.render(
        <CourseInformation courseID={"TES1000"}/>
    );
    component2 = renderer2.getRenderOutput();
    it("One course", () => {
        expect(component2).toMatchSnapshot();
    });

    renderer2.render(
        <CourseInformation courseID={"TDT4100"}/>
    );
    component2 = renderer2.getRenderOutput();
    it("Different course", () => {
        expect(component2).toMatchSnapshot();
    });
});