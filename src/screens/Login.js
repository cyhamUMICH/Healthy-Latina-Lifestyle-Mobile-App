import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';

//import * as firebase from 'firebase/app';
import firebase, { auth } from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

//https://code.tutsplus.com/tutorials/common-react-native-app-layouts-login-page--cms-27639
const Login = (props) => {

  const[username, setUsername] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[needPassword, setNeed] = useState(false);

  async function loadEmail(user){
    var temp = user;
    const load = async (user)=>{//loads email from a given username
      await firebase.firestore().collection('Users').where('username', '==', user).get()
        .then(querySnapshot => {
          if (querySnapshot.size > 0) {
              const docSnapshot = querySnapshot.docs[0];
              temp = getEmail(docSnapshot);
          }
          else {
              // decide what you want to do if no results
          }
        });
    }

    const getEmail  =(documentSnapshot) =>{
      // console.log(documentSnapshot.exists());
      return documentSnapshot.get('email');
    }

    await load(user);
    return temp;
  }


  async function handleLogon(){

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;//somehow makes sure that its an email
    var checkEmail = username;
    if (reg.test(checkEmail) === false) {
      const temp = await loadEmail(checkEmail);
      checkEmail = temp;
    }

    //if username and password arte in the database,
    firebase.auth().signInWithEmailAndPassword(checkEmail, password)
    .then(res => {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Home',
              params: {navigation: props.navigation} 
            },
          ],
        })
      );
      setNeed(false);
    })
    .catch(error => setNeed(true))
    //console.log(error.toString(error));

    //else if they aren't add winvalid username/password.
  }

  function handlePasswordReset(){
    props.navigation.navigate("PasswordReset")
    setNeed(false)
  }

  return (
    <View style={styles.app}>
      <View style={styles.fullWidthWindow}>
        <View style={styles.smallerWidthWindow}>
          <Image 
            source={require('../../assets/logo-title.png')} 
            style={styles.loginPhoto}
            />

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              textAlign="center"
              placeholder="email"
              placeholderTextColor={colors.text}
              onChangeText={username => setUsername(username)}

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
            buttonStyle={styles.smallButton}
            titleStyle={styles.buttonText}
            title="Login"  onPress={() => handleLogon()}
          />
          <Button 
            buttonStyle={styles.smallButton}
            titleStyle={styles.buttonText}
            title="Create an Account" onPress={() => props.navigation.navigate("Register")} 
          />

          <View>
            {needPassword &&
            <Button
              //buttonStyle={styles.smallButton}
              //titleStyle={styles.buttonText}
              title="Forgot Password?" onPress={() => handlePasswordReset()}
              type = 'clear'
            />
            }
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;


