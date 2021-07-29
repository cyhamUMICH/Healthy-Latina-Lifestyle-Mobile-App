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
const[canUse, setCandUse] =useState(false);//opposite

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

             })
    }
    //console.log("try "+ load(user));
return load(user);
}

async function createAccount(){//add first/last name fields for easier searching later I feel

const check =  checkUsername(username);
//console.log(check);

if(check)
{
console.log(check);

const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)

const Userid = userCredential.user.uid

const dbh = firebase.firestore().collection('Users').doc(Userid)
await dbh.set({
GroupID:[],
name: name,
username: username,
email: email
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
  displayName:aUsername
  });

props.navigation.navigate('Home')
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