import React from 'react';
import { Text } from 'react-native-elements';
import Slider from '@react-native-community/slider';
import { colors } from '../styles/Colors';

import { View } from 'react-native'

const PlayerSlider = (props) => {
  // Convert seconds to HH:MM:SS, then remove HH if 00
  // https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript
  let duration = new Date(props.duration * 1000).toISOString().substr(11, 8);
  let current = new Date(props.currentValue * 1000).toISOString().substr(11, 8);
  // Format the current time before formatting the duration
  //   Want to show/hide the HH based on if the duration will show/hide it
  current = (duration.substr(0, 2) == "00") ? current.substr(3) : current;
  duration = (duration.substr(0, 2) == "00") ? duration.substr(3) : duration;

  return (
    <View>
      <Slider
        value={props.currentValue}
        onValueChange={value => props.setCurrentValue(value)}
        onSlidingComplete={value => props.setCurrentValue(value)}
        minimumValue={0}
        maximumValue={props.duration}
        minimumTrackTintColor={colors.minimumSliderColor}
        maximumTrackTintColor={colors.maximumSliderColor}
        step={1}
      />
      <View style={{alignSelf: 'center'}}>
        <Text>{current} | {duration}</Text>
      </View>
    </View>
  )
};

export default PlayerSlider;