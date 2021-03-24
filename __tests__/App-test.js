// Code from: https://github.com/byCedric/expo-guide-ci/blob/master/__tests__/App-test.js
//      and https://jestjs.io/docs/tutorial-react-native
import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';

test('renders the loading screen', async () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders the root without loading screen', async () => {
  const tree = renderer.create(<App skipLoadingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});