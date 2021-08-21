import React, {useState } from 'react';
import { View } from 'react-native';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors'
import { Button } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import * as firebase from 'firebase'
import { Text } from 'react-native';
import 'firebase/firestore';
import 'firebase/storage';
import { Alert } from 'react-native';

const Register = (props) => {

  const[name, setName] = useState('');
  const[email, setEmail] = useState('');
  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const[canUse, setCandUse] =useState(false);//opposite

  function createOneButtonAlertForNotValidEmail(){
    Alert.alert(
      "Invalid Input",
      "Please enter an unused, valid email address and ensure your password is at least 6 characters long.",
      [
        { text: "OK"}
      ],
      { cancelable: true }
    );
  }

  async function checkUsername(user)
  {
    const load =async  (user)=>{//loads email from a given username
    console.log('in');

    await firebase.firestore().collection('Users').where('username', '==', user).get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          console.log("false");
          return false;
        }
        else
        {
          console.log("true");
          return true;
        }

      });
    }
    //console.log("try "+ load(user));
    return load(user);
  }

  async function createAccount(){//add first/last name fields for easier searching later I feel

    const check =  checkUsername(username);
    //console.log(check);

    if(check)
    {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;//somehow makes sure that its an email
      var checkEmail = email;
      if (reg.test(checkEmail) === false) {
        createOneButtonAlertForNotValidEmail();
      }
      else
      {
          const userCredential = firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((temp) => {
              console.log("oof");
              const Userid = temp.user.uid

              const dbh = firebase.firestore().collection('Users').doc(Userid)
              dbh.set({
                GroupID:[],
                name: name,
                username: username,
                email: email,
                admin: false,
                imagePath: 'UserInfo/profilePictures/ProfilePicture.png',
              })
              .then(() => {
                console.log("Document successfully written!");
              })
              .catch((error) => {
                setCandUse(true);
                console.error("Error writing document: ", error);
              });
          
              var user = firebase.auth().currentUser;

              user.updateProfile({
                displayName:username
              });
            
              props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: 'Home' },
                  ],
                })
              );
            })
            .catch((error) => {
              console.log(error);
              createOneButtonAlertForNotValidEmail()
            });
      }
    }
    else{
      setCandUse(true);
    }
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
        <View>
          {canUse &&
          <Text style = {styles.usernameText}> Username Already in Use </Text>
          }
        </View>
      </View>
    </View>
  );
};

export default Register;