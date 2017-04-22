/**
 * Created by jan on 19/04/2017.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import PlannedSession from '../../src/components/Home/PlannedSession.js';
import TestUtils from "react-addons-test-utils"
import firebase from 'firebase'
import shallow from 'enzyme'
//state.sessions = jest.fn(() => {return {1492786690143: {goal: "grsg"}}});
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
describe("Stopwatch", function () {
    let renderer2;
    let component2;
    renderer2 = TestUtils.createRenderer();
    renderer2.render(
        <PlannedSession emne={"TES1000"} callbackParent={(newState) => this.onChildChanged(newState) }/>
    );
    component2 = renderer2.getRenderOutput();
    it("One course", () => {
        expect(component2).toMatchSnapshot();
    });
    it('Open set old session', () => {
        const wrapper = shallow(<AddSession courseID={"TES1000"}/>);
        wrapper.find('Button').first().simulate('click');
        wrapper.find('Button').at(1).simulate('click');



    })
});