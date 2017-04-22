import React from 'react';
import renderer from 'react-test-renderer';
import ManageCourses from '../../src/components/Dashboard/ManageCourses.js';
import shallow from 'enzyme'

import mount from 'enzyme'
const courses = ["IT1010", "TDT4100"];
describe('AddCourse renders FormGroup and button', function() {


    const component = renderer.create(
        <ManageCourses />
    ).toJSON();
     //renders h4 if no courses in props
    it("No courses", () => {
        expect(component).toMatchSnapshot();
    });

    const componentWithProps = renderer.create(
        <ManageCourses courses={courses} />
    ).toJSON();

    it("With courses", () => {
        expect(componentWithProps).toMatchSnapshot();
    });

});
