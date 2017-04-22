/**
 * Created by jan on 21/04/2017.
 */
/**
 * Created by jan on 19/04/2017.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import AddMessage from '../../src/components/ProfessorHome/AddMessage.js';
import TestUtils from "react-addons-test-utils"
import {mount} from 'enzyme'
import jest from 'jest'


describe("Add Message", function () {
    let renderer2;
    let component2;
    renderer2 = TestUtils.createRenderer();
    renderer2.render(
        <AddMessage courseID={"TES1000"}/>
    );
    component2 = renderer2.getRenderOutput();
    it("Not logged in", () => {
        expect(component2).toMatchSnapshot();
    });




    it('Test start button', () => {

        const wrapper = mount(<AddMessage courseID={"TES1000"}/>);
        const input = wrapper.find('input')
        input.simulate('change', { target: { value: 'Hello' } });
        wrapper.find('button').simulate('click')
        expect(wrapper.state('value')).toBe('Hello');
       //wrapper.find('input').get(0).simulate('change', {target: {value: 'My new value'}});

    })

});
/*
 test('renders home if not logged in', () => {
 const component = renderer.create(
 <Home />
 ).toJSON();
 expect(component).toMatchSnapshot(); //renders h4 if no courses in props
 const component2 = renderer.create(
 <Home courses={courses} authed={true} admin={true}/>
 ).toJSON();
 expect(component2).toMatchSnapshot();
 })*/