/**
 * Created by jan on 19/04/2017.
 */
import React from 'react';
import { shallow } from 'enzyme';
import Home from '../src/components/Home/Home.js';

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
const auth = true;
const adm = false;
const courseNull = null;

describe('Welcome', () => {
    it('Renders home', () => {
        const home = shallow(<Home />);
        expect(home.find('div').text()).toEqual('Home. Not Protected. Anyone can see this.');
    });
    it('renders without courses', () => {
        const home = shallow(<Home courses={courseNull} authed={true} admin={false}/>);
        expect(home.find('h4').text()).toEqual('No courses')
    })
});