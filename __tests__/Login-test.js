// Code from: https://github.com/byCedric/expo-guide-ci/blob/master/__tests__/App-test.js
//      and https://jestjs.io/docs/tutorial-react-native
import React from 'react';
import Login from '../src/screens/Login';
import renderer from 'react-test-renderer';

test('Renders Login With the Loading Screen', async () => {
  const tree = renderer.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders Login Without the Loading Screen', async () => {
  const tree = renderer.create(<Login skipLoadingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});