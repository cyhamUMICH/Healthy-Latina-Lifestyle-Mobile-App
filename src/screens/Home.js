import React, { useState } from 'react';
import { Button } from 'react-native-elements';
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
              <Image source={require("../../assets/timer.png")} style={{ height: 32, width: 32 }}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.homepageRoundButton} onPress={() => props.navigation.navigate("MeditationList")}>
              <Image source={require("../../assets/meditation.png")} style={{ height: 43, width: 43 }}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.homepageRoundButton} onPress={() => props.navigation.navigate("ChallengeList")}>
              <Image source={require("../../assets/calendar-challenge.png")} style={{ height: 43, width: 43 }}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.homepageRoundButton} onPress={() => props.navigation.navigate("AddContent")}>
              <Image source={require("../../assets/addContent.png")} style={{ height: 43, width: 43 }}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.homepageRoundButton} onPress={() => props.navigation.navigate("YogaList")}>
            </TouchableOpacity>

            <TouchableOpacity style={styles.homepageRoundButton} onPress={() => props.navigation.navigate("Journal")}>
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