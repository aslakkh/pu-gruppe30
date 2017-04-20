/**
 * Created by jan on 19/04/2017.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../src/components/Home/Home.js';
import TestUtils from "react-addons-test-utils"

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
const coursesNull=null;

describe("Home", function () {
   let renderer2;
   let renderer3;
   let renderer4;
   let component2;
   let component3;
   let component4;
   renderer2 = TestUtils.createRenderer();
   renderer2.render(
       <Home/>
   );
    component2 = renderer2.getRenderOutput();
   it("Not logged in", () => {
       expect(component2).toMatchSnapshot();
   });


    renderer3 = TestUtils.createRenderer();
    renderer2.render(
        <Home courses={courses} authed={true} admin={false}/>
    );
    component3 = renderer3.getRenderOutput();
    it("log in, with courses", () => {
        expect(component3).toMatchSnapshot();
    })
    renderer4 = TestUtils.createRenderer();
    renderer4.render(
        <Home courses={coursesNull} authed={true} admin={false}/>
    );
    component4 = renderer4.getRenderOutput();
    it("log in, no courses", () => {
        expect(component4).toMatchSnapshot();
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