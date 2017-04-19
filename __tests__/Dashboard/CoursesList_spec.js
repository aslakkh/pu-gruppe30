import React from 'react';
import shallow from 'enzyme';
import TestUtils from "react-addons-test-utils";
import CoursesList from '../../src/components/Dashboard/CoursesList.js';

const courses = {
    IT5555: {
        active: true,
        goal: 0,
        goals: {},
        oldGoals: {},
        time: 0,
    },
    TDT0000: {
        active: true,
        goal: 0,
        goals: {},
        oldGoals: {},
        time: 0,
    }
}

describe("CoursesList", function(){
    var renderer;
    renderer = TestUtils.createRenderer();

    renderer.render(
        <CoursesList />
    )
    var component = renderer.getRenderOutput();

    it('renders without props', () => {
        expect(component).toMatchSnapshot();
    })

    renderer.render(
        <CoursesList courses={courses}/>
    )
    var componentWithProps = renderer.getRenderOutput();

    it('renders with props', () => {
        expect(componentWithProps).toMatchSnapshot();
    })

})
