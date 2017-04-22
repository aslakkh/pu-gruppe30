/**
 * Created by jan on 20/04/2017.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import SessionPlanner from '../src/components/SessionPlanner/SessionPlanner.js';
import TestUtils from "react-addons-test-utils"

jest.useFakeTimers();
const DATE_TO_USE = new Date('2016');
const _Date = Date;
global.Date = jest.fn(() => DATE_TO_USE);
global.Date.UTC = _Date.UTC;
global.Date.parse = _Date.parse;
global.Date.now = _Date.now;
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
        <SessionPlanner course={'TES1000'}/>
    );
    component2 = renderer2.getRenderOutput();
    it("One course", () => {
        expect(component2).toMatchSnapshot();
    });
});