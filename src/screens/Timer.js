import * as React from 'react';
import {Picker} from '@react-native-picker/picker'
import { View, StyleSheet, Text } from 'react-native';
import { styles } from '../styles/Styles';
import TimerView from "../components/timerview.js"
import Selectors from "../components/selectors.js"
import ActionButtons from "../components/actionbuttons.js"
//import {vibrate} from './utils'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      Minutes: 5,
      Seconds: 0,
      Timer: 1500,
      timer: 300,
      status: "duration",
      stopped: true,
      choosenIndex: 0,
    }
    this.beginCounter.bind(this)
  }

  beginCounter = () => {
    this.setState(prevState => ({stopped: false}))
    this.setState(prevState => ({Timer: prevState.Minutes * 60 + prevState.Seconds}))
    this.interval = setInterval(this.decrementCounter, 1000)
  }
  
  decrementCounter = () => {
    this.setState(prevState => ({timer: prevState.timer - 1}))
    if (this.state.timer === 0) {
      //vibrate()
      this.stopCounter()
    }
  }

  stopCounter = () => {
    clearInterval(this.interval)
  }

  resetCounter = () => {
    this.setState(prevState => ({timer: prevState.Timer}))
    this.setState(prevState => ({status: "duration"}))
    this.setState(prevState => ({stopped: true}))
    clearInterval(this.interval)
  }

  incrementMinutes = () => {
    if (this.state.Minutes < 59) {
      this.setState(prevState => ({Minutes: prevState.Minutes + 1}))
    }

    this.setState(prevState => ({Timer: prevState.Minutes * 60 + prevState.Seconds}))

    if (this.state.stopped) {
      this.resetCounter()
    }
  }

  incrementSeconds = () => {
    if (this.state.Seconds < 59) {
      this.setState(prevState => ({Seconds: prevState.Seconds + 1}))
    }

    this.setState(prevState => ({Timer: prevState.Minutes * 60 + prevState.Seconds}))
    
    if (this.state.stopped) {
      this.resetCounter()
    }
  }

  decrementMinutes = () => {
    if (this.state.Minutes > 0) {
      this.setState(prevState => ({Minutes: prevState.Minutes - 1}))
    }

    this.setState(prevState => ({Timer: prevState.Minutes * 60 + prevState.Seconds}))
  
    if (this.state.stopped) {
      this.resetCounter()
    }
  }

  decrementSeconds = () => {
    if (this.state.Seconds > 0) {
      this.setState(prevState => ({Seconds: prevState.Seconds - 1}))
    }

    this.setState(prevState => ({Timer: prevState.Minutes * 60 + prevState.Seconds}))
    
    if (this.state.stopped) {
      this.resetCounter()
    }
  }
  
  render() {
    return <OnlyUpdateOnEvens timer={this.state.timer} />
  }

  render() {
    
    return (
      <View style={styles.container}>
        <Picker style={styles.picker} selectedValue={this.state.language}
        onValueChange={(itemValue, itemPosition) =>  this.setState({language: itemValue, choosenIndex: itemPosition})}>
          <Picker.Item label = "Meditation" value = "meditation">
          </Picker.Item>
          <Picker.Item label = "Yoga" value = "yoga">
          </Picker.Item>
          <Picker.Item label = "Breathing" value = "breathing">
          </Picker.Item>
          <Picker.Item label = "Healing" value = "healing">
          </Picker.Item>
          <Picker.Item label = "Prayer" value = "prayer">
          </Picker.Item>
        </Picker>
        <Timer time = {this.state.timer} 
          start = {this.beginCounter} 
          reset = {this.resetCounter}
          stop = {this.stopCounter}
          minUp = {this.incrementMinutes}
          secUp = {this.incrementSeconds}
          minDw = {this.decrementMinutes}
          secDw = {this.decrementSeconds}
          minval = {this.state.Minutes}
          secval = {this.state.Seconds}
        />
      </View>
    );
  }
}

const Timer = props => {
  timeToShow = (time) => {
    let seconds = time % 60
    if (seconds < 10) {
      seconds = "0" + seconds
    }
    let minutes = (time - seconds)/60
    return minutes + ":" + seconds
  }

  return (
    <View style={styles.container}>
      <TimerView time = {this.timeToShow(props.time)} />
      <Selectors  minUp = {props.minUp}
                  minDw = {props.minDw}
                  secUp = {props.secUp}
                  secDw = {props.secDw}
                  minval = {props.minval}
                  secval = {props.secval}
                />
      <ActionButtons start = {props.start} stop = {props.stop} reset = {props.reset}/>
    </View>
  );
}