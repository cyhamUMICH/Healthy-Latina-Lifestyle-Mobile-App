// Code from: https://github.com/byCedric/expo-guide-ci/blob/master/__tests__/App-test.js
//      and https://jestjs.io/docs/tutorial-react-native
import React from 'react';
import PasswordReset from '../src/screens/PasswordReset';
import renderer from 'react-test-renderer';

test('Renders Password Reset With the Loading Screen', async () => {
  const tree = renderer.create(<PasswordReset />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders Password Reset Without the Loading Screen', async () => {
  const tree = renderer.create(<PasswordReset skipLoadingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});