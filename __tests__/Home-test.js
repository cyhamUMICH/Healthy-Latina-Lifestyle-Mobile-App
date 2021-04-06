// Code from: https://github.com/byCedric/expo-guide-ci/blob/master/__tests__/App-test.js
//      and https://jestjs.io/docs/tutorial-react-native
import React from 'react';
import Home from '../src/screens/Home';
import renderer from 'react-test-renderer';

test('renders the loading screen', async () => {
  const tree = renderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders the root without loading screen', async () => {
  const tree = renderer.create(<Home skipLoadingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});