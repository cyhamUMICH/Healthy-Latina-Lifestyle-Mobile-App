// Code from: https://github.com/byCedric/expo-guide-ci/blob/master/__tests__/App-test.js
//      and https://jestjs.io/docs/tutorial-react-native
import React from 'react';
import MeditationList from '../src/screens/MeditationList';
import renderer from 'react-test-renderer';

test('Renders Meditation List With the Loading Screen', async () => {
  const tree = renderer.create(<MeditationList />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders Meditation List Without the Loading Screen', async () => {
  const tree = renderer.create(<MeditationList skipLoadingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});