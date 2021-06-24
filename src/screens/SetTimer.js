import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';

const SetTimer = (props) => {
  const [duration, setDuration] = useState(0);
  const [numberStack, setNumberStack] = useState("000000");

  const calculateDuration = () => {
    let hours = parseInt(numberStack.substr(0, 2));
    let minutes = parseInt(numberStack.substr(2, 2));
    let seconds = parseInt(numberStack.substr(4,2));

    setDuration((60 * 60 * hours) + (60 * minutes) + seconds);
  };

  const addNumber = (num) => {
    if (numberStack[0] == "0") {
      let newNumberStack = numberStack.substr(1,5) + num;
      setNumberStack(newNumberStack);
    }
  };

  const removeNumber = () => {
    let newNumberStack = "0" + numberStack.substr(0,5);
    setNumberStack(newNumberStack);
  };

  useEffect(() => {
    calculateDuration();
  }, [numberStack]);

  return(
    <View style={styles.app}>
      <View style={styles.fullWidthWindow}>
        <View style={styles.timerScreen}>
          <View style={styles.setTimerDisplayContainer}>
            <Text style={styles.setTimerDisplayNumber}>{numberStack.substr(0, 2)}</Text>
            <Text style={styles.setTimerDisplayColon}>:</Text>
            <Text style={styles.setTimerDisplayNumber}>{numberStack.substr(2, 2)}</Text>      
            <Text style={styles.setTimerDisplayColon}>:</Text>
            <Text style={styles.setTimerDisplayNumber}>{numberStack.substr(4, 2)}</Text>        
          </View>
          <View style={styles.setTimerDisplayContainer}>
            <Text style={styles.setTimerDisplayLabel}>Hours</Text>
            <Text style={styles.setTimerDisplayLabelSpace}></Text>
            <Text style={styles.setTimerDisplayLabel}>Minutes</Text>
            <Text style={styles.setTimerDisplayLabelSpace}></Text>
            <Text style={styles.setTimerDisplayLabel}>Seconds</Text>
          </View>

          <View style={styles.setTimerButtonsContainer}>
            <View style={styles.timerButtonsRow}>
              <TouchableOpacity style={styles.setTimerNumberButton} 
                onPress={() => addNumber("1")}>
                <View style={styles.floatingActionIcon}>
                  <Text style={styles.setTimerNumberButtonText}>1</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.setTimerNumberButton} 
                onPress={() => addNumber("2")}>
                <View style={styles.floatingActionIcon}>
                  <Text style={styles.setTimerNumberButtonText}>2</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.setTimerNumberButton} 
                onPress={() => addNumber("3")}>
                <View style={styles.floatingActionIcon}>
                  <Text style={styles.setTimerNumberButtonText}>3</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.timerButtonsRow}>
              <TouchableOpacity style={styles.setTimerNumberButton} 
                onPress={() => addNumber("4")}>
                <View style={styles.floatingActionIcon}>
                  <Text style={styles.setTimerNumberButtonText}>4</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.setTimerNumberButton} 
                onPress={() => addNumber("5")}>
                <View style={styles.floatingActionIcon}>
                  <Text style={styles.setTimerNumberButtonText}>5</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.setTimerNumberButton} 
                onPress={() => addNumber("6")}>
                <View style={styles.floatingActionIcon}>
                  <Text style={styles.setTimerNumberButtonText}>6</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.timerButtonsRow}>
              <TouchableOpacity style={styles.setTimerNumberButton} 
                onPress={() => addNumber("7")}>
                <View style={styles.floatingActionIcon}>
                  <Text style={styles.setTimerNumberButtonText}>7</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.setTimerNumberButton} 
                onPress={() => addNumber("8")}>
                <View style={styles.floatingActionIcon}>
                  <Text style={styles.setTimerNumberButtonText}>8</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.setTimerNumberButton} 
                onPress={() => addNumber("9")}>
                <View style={styles.floatingActionIcon}>
                  <Text style={styles.setTimerNumberButtonText}>9</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.timerButtonsRow}>
              <TouchableOpacity style={styles.setTimerIconButton} 
                onPress={() => {
                  if (duration != 0) {
                    props.navigation.navigate("Timer", {
                      duration: duration,
                      isPlaying: true
                    });
                  }
                }}>
                <View style={styles.floatingActionIcon}>
                  <Icon name="play-arrow" type="material" size={styles.timerIconSize} color={colors.text} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.setTimerNumberButton} 
                onPress={() => addNumber("0")}>
                <View style={styles.floatingActionIcon}>
                  <Text style={styles.setTimerNumberButtonText}>0</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.setTimerIconButton} 
                onPress={removeNumber} onLongPress={() => setNumberStack("000000")}>
                <View style={styles.floatingActionIcon}>
                  <Icon name="backspace" type="material" size={styles.timerIconReducedSize} color={colors.text} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SetTimer;