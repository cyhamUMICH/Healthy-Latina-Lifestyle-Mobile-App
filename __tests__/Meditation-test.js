// Code from: https://github.com/byCedric/expo-guide-ci/blob/master/__tests__/App-test.js
//      and https://jestjs.io/docs/tutorial-react-native
import React from 'react';
import Meditation from '../src/screens/Meditation';
import renderer from 'react-test-renderer';

const mockedParams = {
  route: { 
    params: {
      "audioPath": "",
      "contentID": "8U6yXRAgwjdK2oEQuuhE",
      "cost": 4.99,
      "dateAdded": {
        "nanoseconds": 0,
        "seconds": 1620403200,
      },
      "description": "Deep breathing exercises to help lower your anxiety.",
      "difficulty": "A",
      "duration": 340,
      "featured": true,
      "imagePath": "https://healthylatinalifestylecom.files.wordpress.com/2017/10/cropped-cropped-peackcock-color-healthy-latino-20171.jpg",
      "language": "EN",
      "title": "Relax and Recharge",
      "topics": [
        "Anxiety"
      ]
    }
  }
};

// https://stackoverflow.com/questions/66563806/typeerror-cannot-read-property-params-of-undefined-jest-testing-react-nativ
test('Renders Meditation With the Loading Screen', async () => {
  const tree = renderer.create(<Meditation {...mockedParams} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders Meditation Without the Loading Screen', async () => {
  const tree = renderer.create(<Meditation  {...mockedParams} skipLoadingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});