/**
 * Created by jan on 21/04/2017.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import Statistics from '../../src/components/ProfessorHome/Statistics.js';
import TestUtils from "react-addons-test-utils"
import {mount} from 'enzyme'
import jest from 'jest'


describe("List Message", function () {
    let renderer2;
    let component2;
    let component3;
    renderer2 = TestUtils.createRenderer();
    renderer2.render(
        <Statistics courseID={null}/>
    );
    component2 = renderer2.getRenderOutput();
    it("Not logged in", () => {
        expect(component2).toMatchSnapshot();
    });
    renderer2.render(
        <Statistics courseID={"TES1000"}/>
    );
    component3 = renderer2.getRenderOutput();
    it("Not logged in", () => {
        expect(component2).toMatchSnapshot();
    });



    it('Test start button', () => {

        const wrapper = mount(<Statistics courseID={"TES1000"}/>);
        wrapper.find('Button').simulate('click')

    })

})
