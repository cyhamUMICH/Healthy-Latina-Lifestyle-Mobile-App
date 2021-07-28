import React, { useState } from 'react';
import { Button, Icon } from 'react-native-elements';
import { Stylesheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { styles } from '../styles/Styles'; 

const Home = (props) => {
  
  return (
    <View style={styles.app}>
        <Image 
        source={require('../../assets/logo-icon.png')} 
        style={styles.homepageLogo}
        />  
       <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flex: 1 }}
          >
           <TouchableOpacity style={styles.homepageRoundButton} onPress={() => props.navigation.navigate("SetTimer")}>
            <Icon name="timer" type="Ionicons" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.homepageRoundButton} onPress={() => props.navigation.navigate("MeditationList")}>
            <Icon name="meditation" type="material-community" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.homepageRoundButton} onPress={() => props.navigation.navigate("ChallengeList")}>
            <Icon name="calendar" type="font-awesome" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.homepageRoundButton} onPress={() => props.navigation.navigate("AddContent")}>
            <Icon name="addfile" type="antdesign" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.homepageRoundButton} onPress={() => props.navigation.navigate("CourseList")}>
            <Icon name="file-video-o" type="font-awesome" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.homepageRoundButton} onPress={() => props.navigation.navigate("YogaList")}>
            <Icon name="yoga" type="material-community" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.homepageRoundButton} onPress={() => props.navigation.navigate("PodcastList")}>
            <Icon name="podcast" type="material-community" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.homepageRoundButton} onPress={() => props.navigation.navigate("Journal")}>
            <Icon name="book" type="antdesign" />
            </TouchableOpacity>
  
            </ScrollView>
      {/*<View style={{flex: 1, flexDirection: "column", justifyContent: "space-evenly"}}>
        < Button buttonStyle={styles.smallButton} titleStyle={styles.buttonText} title="Login" onPress={() => props.navigation.navigate("Login")} />
        <Button buttonStyle={styles.smallButton} titleStyle={styles.buttonText} title="Register" onPress={() => props.navigation.navigate("Register")} />
  <Button buttonStyle={styles.smallButton} titleStyle={styles.buttonText} title="Edit Account" onPress={() => props.navigation.navigate("EditAccount")} /> */}
      {/*} <Button buttonStyle={styles.smallButton} titleStyle={styles.buttonText} title="Meditation List" onPress={() => props.navigation.navigate("MeditationList")} />
         <Button title="Meditation" onPress={() => props.navigation.navigate("Meditation")} /> 
        <Button buttonStyle={styles.smallButton} titleStyle={styles.buttonText} title="Timer" onPress={() => props.navigation.navigate("Timer")} /> */}
</View> 
   
  );
};

export default Home;