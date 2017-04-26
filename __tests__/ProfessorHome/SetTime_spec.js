/**
 * Created by jan on 26/04/2017.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import SetTime from '../../src/components/ProfessorHome/SetTime.js';
import TestUtils from "react-addons-test-utils"
import {shallow, render} from 'enzyme';
describe("Set Time", function () {
    it('load with TES9000', () => {
        const component = renderer.create(<SetTime courseID={"TES9000"}/>);
        const json = component.toJSON();
        expect(json).toMatchSnapshot();
    });
    it('Open set old session', () => {
        const wrapper = shallow(<SetTime courseID={"TES1000"}/>);
        wrapper.find('Button').first().simulate('click');
        wrapper.find('Button').last().simulate('click')



    })
});