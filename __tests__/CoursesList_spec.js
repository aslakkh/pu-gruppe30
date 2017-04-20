import React from 'react';
import renderer from 'react-test-renderer';
import CoursesList from '../src/components/Dashboard/CoursesList.js';

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
};

test('CoursesList renders ListGroup', () => {
    const component = renderer.create(
        <CoursesList courses={courses} />
    ).toJSON();
    expect(component).toMatchSnapshot();
});