/**
 * Created by jan on 19/04/2017.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import AddSession from '../src/components/Home/AddSession.js';
import TestUtils from "react-addons-test-utils"

jest.mock('../src/helpers/auth.js');

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
describe("AddSession", function () {
    let renderer2;
    let component2;
    renderer2 = TestUtils.createRenderer();
    renderer2.render(
        <AddSession courseID={"TES1000"}/>
    );
    component2 = renderer2.getRenderOutput();
    it("One course", () => {
        expect(component2).toMatchSnapshot();
    });
});