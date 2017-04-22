/**
 * Created by jan on 20/04/2017.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import EditGoal from '../src/components/Courses/EditGoal.js';
import TestUtils from "react-addons-test-utils"


describe("Edit Goal", function () {
    let renderer2;
    let component2;
    renderer2 = TestUtils.createRenderer();
    renderer2.render(
        <EditGoal courseID={'TES1000'} showModal={true} view={"Daily Goal"} />
    );
    component2 = renderer2.getRenderOutput();
    it("One course", () => {
        expect(component2).toMatchSnapshot();
    });
});