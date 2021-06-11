import * as React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { styles } from '../styles/Styles';

const Selectors = (props) => {
    return (
      <View>
        <Text style = {styles.timerselectortitle}>Duration</Text>
        <TimerSelector   minUp = {props.minUp}
                         secUp = {props.secUp}
                         minDw = {props.minDw}
                         secDw = {props.secDw}
                         minval = {props.minval}
                         secval = {props.secval}
        />
      </View>
    )
  }
  
  const TimerSelector = (props) => {
    return (
      <View style = {styles.timercomponent}>
        <MinutesSelector minUp = {props.minUp} minDw = {props.minDw} minval = {props.minval} />
        <Separator /> 
        <SecondsSelector secUp = {props.secUp} secDw = {props.secDw} secval = {props.secval} /> 
      </View>
    );
  }
  
  const MinutesSelector = props =>  {  
      return (
        <View style = {styles.timerObject}>
          <TouchableOpacity onPress = {props.minUp} >
            <Image source={require('../../assets/arrow-up.png')} style = {styles.arrowButton}  />
          </TouchableOpacity>
          <Text style = {styles.timerselector}>{props.minval < 9 ? "0" + props.minval : props.minval}</Text>
          <TouchableOpacity onPress = {props.minDw}>
            <Image source={require('../../assets/arrow-down.png')} style = {styles.arrowButton}  />
          </TouchableOpacity>
        </View>
      );
  }
  
  const SecondsSelector = props => {
      return (
        <View style = {styles.timerObject}>
          <TouchableOpacity onPress = {props.secUp}>
            <Image source={require('../../assets/arrow-up.png')} style = {styles.arrowButton}  />
          </TouchableOpacity>
          <Text style = {styles.timerselector}>{props.secval < 9 ? "0" + props.secval : props.secval}</Text>
          <TouchableOpacity onPress = {props.secDw}>
            <Image source={require('../../assets/arrow-down.png')} style = {styles.arrowButton}  />
          </TouchableOpacity>
        </View>
      );
  }
  
  const Separator = () => {
    return (
        <Text style = {styles.timerselector}>:</Text>
    );
  }

  export default Selectors