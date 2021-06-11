// Code from: https://github.com/byCedric/expo-guide-ci/blob/master/__tests__/App-test.js
//      and https://jestjs.io/docs/tutorial-react-native
import React from 'react';
import EditAccount from '../src/screens/EditAccount';
import renderer from 'react-test-renderer';

test('Renders Edit Account With the Loading Screen', async () => {
  const tree = renderer.create(<EditAccount />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders Edit Account Without the Loading Screen', async () => {
  const tree = renderer.create(<EditAccount skipLoadingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});