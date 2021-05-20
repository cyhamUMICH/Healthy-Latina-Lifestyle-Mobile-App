import React, {useState } from 'react';
import { View } from 'react-native';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors'
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import * as firebase from 'firebase'
import { Text } from 'react-native';
import 'firebase/firestore';
import 'firebase/storage';

const Register = (props) => {

const[name, setName] = useState('');
const[email, setEmail] = useState('');
const[username, setUsername] = useState('');
const[password, setPassword] = useState('');

async function createAccount(){//add first/last name fields for easier searching later I feel


const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)

const Userid = userCredential.user.uid

const dbh = firebase.firestore().collection('Users').doc(Userid)
await dbh.set({
name: name,
username: username,
email: email
})
.then(() => {
    console.log("Document successfully written!");
})
.catch((error) => {
    console.error("Error writing document: ", error);
});



props.navigation.navigate('Temp')

}

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
          onChangeText={name => setName(name)}
        />

        <TextInput
          style={styles.inputText}
          textAlign="center"
          placeholder="email"
          placeholderTextColor={colors.text}
          onChangeText={(email) => setEmail(email)}
        />

        <TextInput
          style={styles.inputText}
          textAlign="center"
          placeholder="username"
          placeholderTextColor={colors.text}
          onChangeText={(username) => setUsername(username)}
        />

        <TextInput
          style={styles.inputText}
          textAlign="center"
          placeholder="password"
          placeholderTextColor={colors.text}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <Button 
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        title="Create Account"  onPress={() => createAccount()}
        />

      </View>
      </View>
</View>
  );
};

export default Register;