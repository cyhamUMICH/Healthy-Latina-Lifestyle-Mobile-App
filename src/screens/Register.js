import React from 'react';
import { View } from 'react-native';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors'
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';

const Register = (props) => {
  return (
    <View style={styles.app}>

    <View style={styles.fullWidthWindow}>
      <View style={styles.smallerWidthWindow}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          textAlign="center"
          placeholder="name"
          placeholderTextColor={colors.text}
          //onChangeText={(email) => setEmail(email)}
        />

        <TextInput
          style={styles.inputText}
          textAlign="center"
          placeholder="email"
          placeholderTextColor={colors.text}
          //onChangeText={(password) => setPassword(password)}
        />

        <TextInput
          style={styles.inputText}
          textAlign="center"
          placeholder="username"
          placeholderTextColor={colors.text}
          //onChangeText={(password) => setPassword(password)}
        />

        <TextInput
          style={styles.inputText}
          textAlign="center"
          placeholder="password"
          placeholderTextColor={colors.text}
          secureTextEntry={true}
          //onChangeText={(password) => setPassword(password)}
        />
      </View>

      <Button 
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        title="Create Account"  onPress={() => props.navigation.navigate("Login")} 
        />

      </View>
      </View>
</View>
  );
};

export default Register;