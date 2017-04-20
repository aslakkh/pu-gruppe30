import React from 'react';
import renderer from 'react-test-renderer';
import ManageCourses from '../src/components/Dashboard/ManageCourses.js';

const courses = ["IT1010", "TDT4100"];

test('ManageCourses renders listgroup, searchbar and functional Modal', () => {
    const component = renderer.create(
        <ManageCourses />
    ).toJSON();
    expect(component).toMatchSnapshot(); //renders h4 if no courses in props

    const componentWithProps = renderer.create(
        <ManageCourses courses={courses} />
    ).toJSON();
    expect(componentWithProps).toMatchSnapshot();
});