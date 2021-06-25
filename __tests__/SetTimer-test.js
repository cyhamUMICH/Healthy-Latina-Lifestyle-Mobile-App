// Code from: https://github.com/byCedric/expo-guide-ci/blob/master/__tests__/App-test.js
//      and https://jestjs.io/docs/tutorial-react-native
import React from 'react';
import SetTimer from '../src/screens/SetTimer';
import renderer from 'react-test-renderer';

test('Renders Set Timer With the Loading Screen', async () => {
  const tree = renderer.create(<SetTimer />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders Set Timer Without the Loading Screen', async () => {
  const tree = renderer.create(<SetTimer skipLoadingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});