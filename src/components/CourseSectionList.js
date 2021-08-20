import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import Tags from './Tags';
import LoadingSpinner from './LoadingSpinner';
import defaultImage from '../../assets/logo-icon.png';

const CourseCards = (props) => {
    return (
        (props.filteredList.length != 0) 
        ? <FlatList 
            style={props.style}
            data={props.filteredList}
            renderItem={(item) => CourseCard(item, props.contentComponent, props.navigation)}
            keyExtractor={item => item.contentID} /> 
        : <Text style={styles.noContent}>No {props.contentType} Match Your Search</Text>
    );
};

const CourseCard = ({item}, contentComponent, navigation) => {
   
    return (
      <TouchableOpacity 
          onPress={() => {navigation.navigate(contentComponent, item)}}>
        <Card containerStyle={styles.card}>
          <Card.Title style={styles.cardTitle}>{item.title}</Card.Title>
        </Card>
      </TouchableOpacity>
    );
  };


const CourseSectionList = (props) => {
  return (
    <View style={styles.fullWidthWindow}>
      <Text style={styles.challengeDayTitle}>
        Course Sections
        </Text>
      <CourseCards 
            style={styles.cardList} 
            contentType={props.contentType}
            filteredList={props.data}
            contentComponent={props.contentComponent}
            navigation={props.navigation} />

    </View>
  );
};

export default CourseSectionList;
