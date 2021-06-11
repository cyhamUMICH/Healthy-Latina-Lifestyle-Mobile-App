// Code from: https://github.com/byCedric/expo-guide-ci/blob/master/__tests__/App-test.js
//      and https://jestjs.io/docs/tutorial-react-native
import React from 'react';
import ChallengeList from '../src/screens/ChallengeList';
import renderer from 'react-test-renderer';

test('Renders Challenge List With the Loading Screen', async () => {
  const tree = renderer.create(<ChallengeList />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders Challenge List Without the Loading Screen', async () => {
  const tree = renderer.create(<ChallengeList skipLoadingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});