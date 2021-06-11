import * as React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from '../styles/Styles';

const ActionButtons = props => {
    return (
      <View style={styles.horizontalButtonLayout}>
        <View style={styles.horizontalSpaceButtonWrapper}>
          <StartButton start = {props.start}/>
        </View>
        <View style={styles.horizontalSpaceButtonWrapper}>
          <StopButton stop = {props.stop}/>
        </View>
        <View style={styles.horizontalSpaceButtonWrapper}>
          <ResetButton reset = {props.reset}/>
        </View>
      </View>
    );
  }
  
  const StartButton = props =>  {
      return (
        <Button buttonStyle={styles.button} titleStyle={styles.buttonText} title="Start" onPress={props.start} />
      );
  }

  const StopButton = props =>  {
    return (
      <Button buttonStyle={styles.button} titleStyle={styles.buttonText} title="Pause" onPress={props.stop} />
    );
}
  
  const ResetButton = props => {
    return (
      <Button buttonStyle={styles.button} titleStyle={styles.buttonText} title="Finish" onPress={props.reset} />
    );
  }

  export default ActionButtons