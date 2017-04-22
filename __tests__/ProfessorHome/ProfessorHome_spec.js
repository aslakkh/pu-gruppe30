/**
 * Created by jan on 19/04/2017.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import ProfessorHome from '../../src/components/ProfessorHome/ProfessorHome.js';
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
const coursesNull=null;

describe("Home", function () {
    let renderer2;
    let renderer3;
    let renderer4;
    let component2;
    let component3;
    let component4;
    renderer2 = TestUtils.createRenderer();
    renderer2.render(
        <ProfessorHome courses={courses}/>
    );
    component2 = renderer2.getRenderOutput();
    it("Not logged in", () => {
        expect(component2).toMatchSnapshot();
    });

});