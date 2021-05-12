import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import { Image } from 'react-native';
//import auth from '@react-native-firebase/auth';



//https://code.tutsplus.com/tutorials/common-react-native-app-layouts-login-page--cms-27639
const Login = (props) => {

const[username, setUsername] = useState("");
const[password, setPassword] = useState("");
const[needPassword, setNeed] = useState(false);

function handleLogon(){
//if username and password arte in the database,
//auth()
//.signInWithEmailAndPassword(username, password);
//else if they aren't add winvalid username/password.
setNeed(true);

}

function handlePasswordReset(){
props.navigation.navigate("Temp")
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
            placeholder="username"
            placeholderTextColor={colors.text}
            onChangeText={username => setUsername(text)}
          />
  
          <TextInput
            style={styles.inputText}  
            textAlign="center"
            placeholder="password"
            placeholderTextColor={colors.text}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(text)}
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
          title="Create an account" onPress={() => props.navigation.navigate("Register")} 
          />

          <View>
          {needPassword &&
          <Button
          buttonStyle={styles.smallButton}
          titleStyle={styles.buttonText}
          title="Forgot Password" onPress={() => handlePasswordReset()}
          />
          }
          </View>


        </View>
      </View>
    </View>
  );
};
export default Login;


