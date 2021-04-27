import React from 'react';
import { View } from 'react-native';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import { Image } from 'react-native';


//https://code.tutsplus.com/tutorials/common-react-native-app-layouts-login-page--cms-27639

const Login = (props) => {
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
            //onChangeText={(email) => setEmail(email)}
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
          buttonStyle={styles.smallButton}
          titleStyle={styles.buttonText}
          title="Login"  onPress={() => props.navigation.navigate("Temp")} 
          />
          <Button 
          buttonStyle={styles.smallButton}
          titleStyle={styles.buttonText}
          title="Create an account" onPress={() => props.navigation.navigate("Register")} 
          />
        </View>
      </View>
    </View>
  );
};

export default Login;