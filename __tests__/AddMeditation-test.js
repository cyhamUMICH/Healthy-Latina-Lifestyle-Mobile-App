// Code from: https://github.com/byCedric/expo-guide-ci/blob/master/__tests__/App-test.js
//      and https://jestjs.io/docs/tutorial-react-native
import React from 'react';
import AddMeditation from '../src/screens/AddMeditation';
import renderer from 'react-test-renderer';

const mockedParams = {
  route: { 
    params: {
      topics: [],
      // https://stackoverflow.com/questions/52569447/how-to-mock-react-navigations-navigation-prop-for-unit-tests-with-typescript-in
      navigation: {
        goBack: jest.fn(),
        replace: jest.fn()
      }
    }
  }
};

test('Renders Add Meditation With the Loading Screen', async () => {
  const tree = renderer.create(<AddMeditation {...mockedParams} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders Add Meditation Without the Loading Screen', async () => {
  const tree = renderer.create(<AddMeditation {...mockedParams} skipLoadingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});