import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import { Component } from 'react-native';
import firebase from 'firebase';




const PasswordReset = (props) => {

const[email, setEmail] = useState('');

function sendEmail(){
firebase
.auth()
.sendPasswordResetEmail(email)
.then(() => props.navigation.navigate('Login'))

}

return(
<View style={styles.app}>

    <View style={styles.fullWidthWindow}>
      <View style={styles.smallerWidthWindow}>
      <View style={styles.inputView}>

        <TextInput
          style={styles.inputText}
          textAlign="center"
          placeholder="email"
          placeholderTextColor={colors.text}
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <Button
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        title="Send Reset Email"  onPress={() => sendEmail()}
        />

      </View>
      </View>
</View>
);
};
export default PasswordReset;