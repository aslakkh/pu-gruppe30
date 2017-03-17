import React from 'react';
import { shallow } from 'enzyme';
import CoursesList from '../src/components/Dashboard/CoursesList';

describe('AddCourse', ()=>{
    it('AddCourse renders formgroup and button', () =>{
        const coursesList = shallow(<CoursesList />);
        expect(coursesList.find('div').containsMatchingElement('FistGroup'));
    });
});