import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/Styles';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';

const Register = (props) => {
  return (
    <View style={styles.app}>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="name"
          placeholderTextColor="#003f5c"
          //onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="email"
          placeholderTextColor="#003f5c"
          //onChangeText={(password) => setPassword(password)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="username"
          placeholderTextColor="#003f5c"
          //onChangeText={(password) => setPassword(password)}
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

      <Button 
        buttonStyle={styles.basicButtons}
        title="Create Account"  onPress={() => props.navigation.navigate("Login")} 
        />


    </View>
  );
};

export default Register;