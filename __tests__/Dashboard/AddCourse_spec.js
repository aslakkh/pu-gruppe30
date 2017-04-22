import React from 'react';
import renderer from 'react-test-renderer';
import AddCourse from '../../src/components/Dashboard/AddCourse.js';
import shallow from 'enzyme'
import TestUtils from "react-addons-test-utils"
describe('AddCourse renders FormGroup and button', function() {
/*    const component = renderer.create(
        <AddCourse />
    ).toJSON();
    expect(component).toMatchSnapshot();*/

    let renderer2;
    let component2;
    renderer2 = TestUtils.createRenderer();
    renderer2.render(
        <AddCourse/>
    );
    component2 = renderer2.getRenderOutput();
    it("One course", () => {
        expect(component2).toMatchSnapshot();
    });
    it('addsession', () => {
        const wrapper = renderer(<AddCourse/>);
        wrapper.find('Button').simulate('click');



    })
});