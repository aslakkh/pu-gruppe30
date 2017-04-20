/**
 * Created by jan on 19/04/2017.
 */


'use strict';
import React from 'react';
import renderer from 'react-test-renderer';
import AddSession from '../src/components/Home/AddSession.js';
import TestUtils from "react-addons-test-utils"

//jest.mock('../src/helpers/auth.js');
jest.useFakeTimers();
Date.getTime = jest.fn(() => 1482363367071);
Date.now = jest.fn(() => 1482363367071);
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
    jest.useFakeTimers();
    Date.getTime = jest.fn(() => 1482363367071);
    Date.now = jest.fn(() => 1482363367071);
    renderer2 = TestUtils.createRenderer();
    renderer2.render(
        <AddSession courseID={"TES1000"}/>
    );
    component2 = renderer2.getRenderOutput();
    it("One course", () => {
        jest.useFakeTimers();
        Date.getTime = jest.fn(() => 1482363367071);
        Date.now = jest.fn(() => 1482363367071);
        expect(component2).toMatchSnapshot();
    });
});