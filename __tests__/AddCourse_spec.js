import React from 'react';
import renderer from 'react-test-renderer';
import AddCourse from '../src/components/Dashboard/AddCourse.js';

test('AddCourse renders FormGroup and button', () => {
    const component = renderer.create(
        <AddCourse />
    ).toJSON();
    expect(component).toMatchSnapshot();
});