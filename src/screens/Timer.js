import React, { useState } from 'react';
import { View, Text, ScrollView, Animated, TouchableOpacity, Platform, Vibration } from 'react-native';
import { Icon } from 'react-native-elements';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import DropDownPicker from 'react-native-dropdown-picker';

const intentionMessages = {
  "meditating": "Meditations are your quiet time, learning how to be present with yourself and giving your brain and body a moment of quiet.",
  "yoga": "Yoga is another form of meditation using movement to connect your body with breath and guided poses.",
  "breathing": "Your deeper connection to self using your deep connection to life (breath)...",
  "healing": "Finding your source of light and breath for recovery and release...",
  "praying": "Moment of focus on intention and self-reflection."
};

const Timer = ({route}) => {
  const duration = route.params.duration;
  const defaultIsPlaying = route.params.isPlaying;

  const [isPlaying, setIsPlaying] = useState(defaultIsPlaying);
  const [resetKey, setResetKey] = useState(0);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [intention, setIntention] = useState(null);
  const [intentionList, setIntentionList] = useState([
    {label: 'Meditating', value: 'meditating'},
    {label: 'Yoga', value: 'yoga'},
    {label: 'Breathing', value: 'breathing'},
    {label: 'Healing', value: 'healing'},
    {label: 'Praying', value: 'praying'}
  ]);

  const formatRemainingTime = (remainingTime) => {
    // Adapted from https://github.com/vydimitrov/react-countdown-circle-timer
    let hours = Math.floor(remainingTime / 3600);
    hours = (hours < 10) ? "0" + hours : hours;
    let minutes = Math.floor((remainingTime % 3600) / 60);
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    let seconds = remainingTime % 60;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    
    return hours + ":" + minutes + ":" + seconds; 
  }; 

  return(
    <View style={styles.app}>
      <View style={styles.fullWidthWindow}>
        <View style={styles.timerScreen}>
          <CountdownCircleTimer
            key={resetKey}
            isPlaying={isPlaying}
            duration={duration}
            // Code from https://github.com/vydimitrov/react-countdown-circle-timer/tree/master/packages/mobile#react-native-countdown-circle-timer
            colors={[
              ['#004777', 0.4],
              ['#F7B801', 0.4],
              ['#A30000', 0.2],
            ]}
            trailColor={colors.modalButtons}
            onComplete={() => {
              let androidVibration = [0, 400, 500, 400, 500, 400];
              let iosVibration = [0, 500, 500];

              if (Platform.OS === 'android') {
                Vibration.vibrate(androidVibration);
              }
              else {
                Vibration.vibrate(iosVibration);
              }
            }}
          >     
            {({ remainingTime, animatedColor }) => (
              <Animated.Text style={{ color: animatedColor, fontSize: 30 }}>
                {formatRemainingTime(remainingTime)}
              </Animated.Text>
            )}
          </CountdownCircleTimer>
          <View style={styles.timerButtonsRow}>
            <TouchableOpacity style={styles.setTimerNumberButton} 
              onPress={() => {
                setIsPlaying(false);
                setResetKey(resetKey + 1);
              }}>
              <View style={styles.floatingActionIcon}>
              <Icon name="undo" type="font-awesome" size={styles.timerIconReducedSize} color={colors.text} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.setTimerNumberButton} 
              onPress={() => setIsPlaying(!isPlaying)}>
              <View style={styles.floatingActionIcon}>
              {isPlaying ? 
                <Icon name="pause" type="material" size={styles.timerIconSize} color={colors.text} />
                :            
                <Icon name="play-arrow" type="material" size={styles.timerIconSize} color={colors.text} />
              }
              </View>
            </TouchableOpacity>
          </View>
          <DropDownPicker
            placeholder="Select an intention..."
            containerStyle={styles.timerIntentionPicker}
            textStyle={styles.timerIntentionText}
            dropDownDirection="BOTTOM"
            open={pickerOpen}
            value={intention}
            items={intentionList}
            setOpen={setPickerOpen}
            setValue={setIntention}
            setItems={setIntentionList}
          />
          <ScrollView style={styles.timerIntentionView}>
            <Text style={styles.timerIntentionText}>
              {intentionMessages[intention]}
            </Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Timer;