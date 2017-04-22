/**
 * Created by jan on 21/04/2017.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import MessageList from '../../src/components/ProfessorHome/MessageList.js';
import TestUtils from "react-addons-test-utils"
import {mount} from 'enzyme'
import jest from 'jest'


describe("List Message", function () {
    let renderer2;
    let component2;
    renderer2 = TestUtils.createRenderer();
    renderer2.render(
        <MessageList courseID={"TES1000"}/>
    );
    component2 = renderer2.getRenderOutput();
    it("Not logged in", () => {
        expect(component2).toMatchSnapshot();
    });

    })


