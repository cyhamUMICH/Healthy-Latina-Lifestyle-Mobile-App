// Code from: https://github.com/byCedric/expo-guide-ci/blob/master/__tests__/App-test.js
//      and https://jestjs.io/docs/tutorial-react-native
import React from 'react';
import AddContent from '../src/screens/AddContent';
import renderer from 'react-test-renderer';

test('Renders Add Content With the Loading Screen', async () => {
  const tree = renderer.create(<AddContent />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders Add Content Without the Loading Screen', async () => {
  const tree = renderer.create(<AddContent skipLoadingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});