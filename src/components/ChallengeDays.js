import React, { useEffect } from 'react';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import { View, Text, TextInput } from 'react-native';
import { Divider } from 'react-native-elements';

const printDate = (date) => {
  if (date) {
    // Add one since getMonth() gives the month index
    let month = date.getMonth() + 1;
  
    return month + '/' + date.getDate() + '/' + date.getFullYear();
  }
};

const ChallengeDays = (props) => {
  useEffect(() => {
    let currentDate = new Date(props.startDate.getFullYear(), props.startDate.getMonth(),
      props.startDate.getDate(), 0, 0, 0, 0);
    let tempDatesArr = [];
    for(let i = 0; i < props.duration; i++) {
      tempDatesArr.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Must be updated in useEffect
    props.setChallengeDaysDates(tempDatesArr);

    // Update dates whenever the duration changes because it will change
    //    no matter if it's the start or end date being updated
  }, [props.duration]);

  let elements = [];
  for(let i = 0; i < props.duration; i++) {
    elements.push(
      <View key={i} style={styles.flexContainer}>
        <Divider style={styles.divider} />
        <Text style={styles.cardTitle}>Challenge Day {i + 1}: {printDate(props.challengeDaysDates[i])}</Text>
        <TextInput 
          style={styles.inputText} textAlign="left"
          placeholder="description" placeholderTextColor={colors.text}
          multiline textAlignVertical="top" numberOfLines={6} 
          onChangeText={input => {
            let tempDescriptionsArr = [...props.challengeDaysDescriptions];
            tempDescriptionsArr[i] = input;
            props.setChallengeDaysDescriptions(tempDescriptionsArr);
          }} />
      </View>
    );
  }

  return(
    <View>
      { elements }
    </View>
  );
};

export default ChallengeDays;