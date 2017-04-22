/**
 * Created by jan on 19/04/2017.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import Sidebar from '../../src/components/ProfessorHome/Sidebar.js';
import TestUtils from "react-addons-test-utils"
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
const courseNull = undefined;
describe("Sidebar", function () {
    let renderer2;
    let renderer3;
    let renderer4;
    let component2;
    let component3;
    let component4;
    renderer2 = TestUtils.createRenderer();
    renderer2.render(
        <Sidebar courses={courseNull}/>
    );
    component2 = renderer2.getRenderOutput();
    it("No courses", () => {
        expect(component2).toMatchSnapshot();
    });
    //renderer3 = TestUtils.createRenderer();
    renderer2.render(
        <Sidebar courses={courses}/>
    );
    component2 = renderer2.getRenderOutput();
    it("One course", () => {
        expect(component2).toMatchSnapshot();
    });
});