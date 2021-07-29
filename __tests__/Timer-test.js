// Code from: https://github.com/byCedric/expo-guide-ci/blob/master/__tests__/App-test.js
//      and https://jestjs.io/docs/tutorial-react-native
import React from 'react';
import Timer from '../src/screens/Timer';
import renderer from 'react-test-renderer';

const mockedParams = {
  route: { 
    params: {
      "duration": 30,
      // In order to test the timer screen, the timer cannot be running to start.
      "isPlaying": false
    }
  }
};

// https://stackoverflow.com/questions/66563806/typeerror-cannot-read-property-params-of-undefined-jest-testing-react-nativ
test('Renders Timer With the Loading Screen', async () => {
  const tree = renderer.create(<Timer {...mockedParams} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders Timer Without the Loading Screen', async () => {
  const tree = renderer.create(<Timer {...mockedParams} skipLoadingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});