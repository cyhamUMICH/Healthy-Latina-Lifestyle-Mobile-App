import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/Styles';

const ActionButtons = props => {
    return (
      <View style = {styles.actionButtons} >
        <StartButton start = {props.start}/>
        <StopButton stop = {props.stop}/>
        <ResetButton reset = {props.reset}/>
      </View>
    );
  }
  
  const StartButton = props =>  {
      return (
        <TouchableOpacity style = {[styles.startButton, styles.button]} onPress = {props.start} >
           <Text style = {styles.buttonTitle}>Start</Text>
         </TouchableOpacity>
      );
  }

  const StopButton = props =>  {
    return (
      <TouchableOpacity style = {[styles.stopButton, styles.button]} onPress = {props.stop} >
         <Text style = {styles.buttonTitle}>Pause</Text>
       </TouchableOpacity>
    );
}
  
  const ResetButton = props => {
    return (
      <TouchableOpacity style = {[styles.resetButton, styles.button]} onPress = {props.reset} >
         <Text style = {styles.buttonTitle}>Finish</Text>
       </TouchableOpacity>
    );
  }

  export default ActionButtons