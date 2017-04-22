import React from 'react';
import { shallow } from 'enzyme';
import TestUtils from "react-addons-test-utils";
import ProfessorDashboard from '../../src/components/Dashboard/ProfessorDashboard.js';

describe("ProfessorDashboard", function(){
    var renderer, component;
    renderer = TestUtils.createRenderer();
    renderer.render(
        <ProfessorDashboard />
    );
    component = renderer.getRenderOutput();

    it('matches snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    

})

