import React from 'react';
import { Button } from 'react-native';
import { View } from 'react-native';
import { styles } from '../styles/Styles';

const Temp = (props) => {
  return (
    <View style={styles.app}>
      <View style={{flex: 1, flexDirection: "column", justifyContent: "space-evenly"}}>
        <Button title="Login" onPress={() => props.navigation.navigate("Login")} />
        <Button title="Register" onPress={() => props.navigation.navigate("Register")} />
        <Button title="Home" onPress={() => props.navigation.navigate("Home")} />
        <Button title="Edit Account" onPress={() => props.navigation.navigate("EditAccount")} />
        <Button title="Meditation List" onPress={() => props.navigation.navigate("MeditationList")} />
        <Button title="Meditation" onPress={() => props.navigation.navigate("Meditation")} />
        <Button title="Timer" onPress={() => props.navigation.navigate("Timer")} />
      </View>
    </View>
  );
};

export default Temp;