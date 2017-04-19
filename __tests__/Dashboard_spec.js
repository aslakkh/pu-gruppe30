import React from 'react';
import renderer from 'react-test-renderer';
import Dashboard from '../src/components/Dashboard/Dashboard.js';

const courses = {
    IT5555: {
        active: true,
        goal: 0,
        goals: {},
        oldGoals: {},
        time: 0,
    },
}

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