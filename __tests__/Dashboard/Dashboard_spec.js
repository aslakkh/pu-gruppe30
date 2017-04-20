import React from 'react';
import {shallow} from 'enzyme';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';
import TestUtils from "react-addons-test-utils";
import Dashboard from '../../src/components/Dashboard/Dashboard.js';

const courses = {
    IT5555: {
        active: true,
        goal: 0,
        goals: {},
        oldGoals: {},
        time: 0,
    },
}

describe("Dashboard", function(){

    it('renders', () => {
        shallow(<Dashboard />);
    })

    it('closeModal sets showModal to false', () => {
        const wrapper = shallow(<Dashboard/>);
        wrapper.find('Button').simulate('click');
        
    })
})

test('Dashboard renders student dashboard', () => {
    const component = renderer.create(
        <Dashboard />
    ).toJSON();
    expect(component).toMatchSnapshot(); //render without courses

    const component2 = renderer.create(
        <Dashboard courses={courses} />
    ).toJSON();
    expect(component2).toMatchSnapshot();
})