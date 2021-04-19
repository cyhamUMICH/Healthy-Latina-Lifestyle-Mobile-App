import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/Styles';
import { Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Image } from 'react-native';


//https://code.tutsplus.com/tutorials/common-react-native-app-layouts-login-page--cms-27639

const Login = (props) => {
  return (
    <View style={styles.app}>

    <Image 
      source={require('../../assets/logo-title.png')} 
      style={styles.loginPhoto}
      />


      <View style={{top: 200}}>
        <Button title="Login" onPress={() => props.navigation.navigate("Temp")} />
        <Button title="Create an account" onPress={() => props.navigation.navigate("Register")} />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="username"
          placeholderTextColor="#003f5c"
          //onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          //onChangeText={(password) => setPassword(password)}
        />
      </View>

    </View>
  );
};

export default Login;