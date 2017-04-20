/**
 * Created by jan on 19/04/2017.
 */
import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from '../src/components/Home/Sidebar.js';

const courses={
    TES1000:{active: true,
        goals: {dailyGoal:{active: false,
            timeSet: 0,
            timeSpent: 0,
            value: 0},
            monthlyGoal:
                {active:false,
                    timeSet:0,
                    timeSpent:0,
                    value:0},
            weeklyGoal:
                {active:false,
                    timeSet:0,
                    timeSpent:0,
                    value:0}

        }
    }};

describe('Sidebar', () => {
    it('Renders Sidebar without courses', () => {
        const sidebar = shallow(<Sidebar courses={undefined} />);
        expect(sidebar.find('h4').text()).toEqual('ingenting');
    });



});