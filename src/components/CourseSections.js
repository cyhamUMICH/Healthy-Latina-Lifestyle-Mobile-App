import React, { useEffect } from 'react';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import { View, Text, TextInput } from 'react-native';
import { Divider } from 'react-native-elements';

const CourseSections = (props) => {
  
  let elements = []

  for(let i = 0; i < props.numSections; i++) {
    elements.push(
      <View key={i} style={styles.flexContainer}>
        <Divider style={styles.divider} />
        <Text style={styles.cardTitle}>Course Section {i + 1}</Text>
        <TextInput 
          style={styles.inputText} textAlign="left"
          placeholder="title" placeholderTextColor={colors.text}
          multiline textAlignVertical="top" numberOfLines={6} 
          onChangeText={input => {
            let tempTitleArr = [...props.courseSectionTitle];
            tempTitleArr[i] = input;
            props.setCourseSectionTitle(tempTitleArr);
          }} />
        <TextInput 
          style={styles.inputText} textAlign="left"
          placeholder="description" placeholderTextColor={colors.text}
          multiline textAlignVertical="top" numberOfLines={6} 
          onChangeText={input => {
            let tempDescriptionsArr = [...props.courseSectionDesc];
            tempDescriptionsArr[i] = input;
            props.setCourseSectionDesc(tempDescriptionsArr);
          }} />
      </View>
    );
  }

  return(
    <View>
      {elements}
    </View>
  );
};

export default CourseSections;