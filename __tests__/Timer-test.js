// Code from: https://github.com/byCedric/expo-guide-ci/blob/master/__tests__/App-test.js
//      and https://jestjs.io/docs/tutorial-react-native
import React from 'react';
import Timer from '../src/screens/Timer';
import renderer from 'react-test-renderer';

test('renders the loading screen', async () => {
  const tree = renderer.create(<Timer />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders the root without loading screen', async () => {
  const tree = renderer.create(<Timer skipLoadingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});