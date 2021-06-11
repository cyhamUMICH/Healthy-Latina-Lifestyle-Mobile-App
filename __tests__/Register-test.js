// Code from: https://github.com/byCedric/expo-guide-ci/blob/master/__tests__/App-test.js
//      and https://jestjs.io/docs/tutorial-react-native
import React from 'react';
import Register from '../src/screens/Register';
import renderer from 'react-test-renderer';

test('Renders Register With the Loading Screen', async () => {
  const tree = renderer.create(<Register />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders Register Without the Loading Screen', async () => {
  const tree = renderer.create(<Register skipLoadingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});