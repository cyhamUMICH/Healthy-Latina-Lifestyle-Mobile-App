// Code from: https://github.com/byCedric/expo-guide-ci/blob/master/__tests__/App-test.js
//      and https://jestjs.io/docs/tutorial-react-native
import React from 'react';
import Groups from '../src/screens/Groups';
import renderer from 'react-test-renderer';

test('Renders Groups With the Loading Screen', async () => {
  const tree = renderer.create(<Groups />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders Groups Without the Loading Screen', async () => {
  const tree = renderer.create(<Groups skipLoadingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});