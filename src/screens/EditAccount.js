import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/Styles';
import { Button } from 'react-native-elements';
import { Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


const EditAccount = (props) => {
  return (
    <View style={styles.app}>

      <Image 
      source={require('../../assets/temporary/Meditation3.png')} 
      style={styles.editAccountProfile}
      />

     
        <Button 
        buttonStyle={styles.basicButtons}
        title="Change profile picture"
        />


      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="name"
          placeholderTextColor="#003f5c"
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="username"
          placeholderTextColor="#003f5c"
        />
      </View>


      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="email"
          placeholderTextColor="#003f5c"
        />
      </View>


      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="password"
          placeholderTextColor="#003f5c"
        />
      </View>


      <Button 
        buttonStyle={styles.basicButtons}
        title="Update profile information" onPress={() => props.navigation.navigate("Temp")}
        />
     

    </View>
  );
};

export default EditAccount;