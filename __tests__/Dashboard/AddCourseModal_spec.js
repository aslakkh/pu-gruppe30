import React from 'react';
import {shallow} from 'enzyme';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';
import TestUtils from "react-addons-test-utils";
import AddCourseModal from '../../src/components/Dashboard/AddCourseModal.js';

const courses = ["IT0000", "TDT4100"];

describe("AddCourseModal", function(){
    // var testUtilsRenderer;
    // testUtilsRenderer = TestUtils.createRenderer();

    // testUtilsRenderer.render(
    //     <AddCourseModal />
    // );
    // var component = testUtilsRenderer.getRenderOutput();

    // it('renders without props', () => {
    //     expect(component).toMatchSnapshot();
    // });

    // testUtilsRenderer.render(
    //     <AddCourseModal showModal={true} courses={courses} />
    // );

    // var componentWithProps = testUtilsRenderer.getRenderOutput();

    // it('renders with props', () => {
    //     expect(componentWithProps).toMatchSnapshot();
    // });

    it('renders', () => {
        shallow(<AddCourseModal />);
    })
})
