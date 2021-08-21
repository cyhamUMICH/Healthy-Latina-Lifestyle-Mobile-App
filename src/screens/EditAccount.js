import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import { Button } from 'react-native-elements';
import { Image } from 'react-native';
import { Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import UploadImage from '../components/UploadImage';;
import firebase, { auth } from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';
import defaultImage from '../../assets/default/ProfilePicture.png';

const EditAccount = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [trueImagePath, setTrueImagePath] = useState('');

  const [oldName, setOldName] = useState('');
  const [oldEmail, setOldEmail] = useState('');
  const [oldUsername, setOldUsername] = useState('');

  const [isUploadInProgress, setIsUploadInProgress] = useState(false);

  const [image, setImage] = useState(null);
  const baseImagePath = "UserInfo/profilePictures/";


  useEffect(() =>{
    const loadOldName = async () =>{
      var user = firebase.auth().currentUser
      await firebase.firestore().collection('Users').doc(user.uid).get()
        .then(documentSnapshot => getName(documentSnapshot))
        .then(oldName => {
          setOldName(oldName);
          setName(oldName);
        });
    };

    const loadOldUsername = async () =>{
      var user = firebase.auth().currentUser;
      await firebase.firestore().collection('Users').doc(user.uid).get()
        .then(documentSnapshot => getUsername(documentSnapshot))
        .then(oldUsername => {
          setOldUsername(oldUsername);
          setUsername(oldUsername);
        });
    };

    const loadOldEmail = async () =>{
      var user = firebase.auth().currentUser
      await firebase.firestore().collection('Users').doc(user.uid).get()
        .then(documentSnapshot => getEmail(documentSnapshot))
        .then(oldEmail => {
          setOldEmail(oldEmail);
          setEmail(oldEmail);
        });
    };

    const loadImagePath = async () =>{
      var user = firebase.auth().currentUser
      await firebase.firestore().collection('Users').doc(user.uid).get()
        .then(documentSnapshot => getImagePath(documentSnapshot))
        .then(imagePath => {
          let storage = firebase.storage();
          console.log(imagePath);
          let pathReference = storage.ref(imagePath);
          pathReference.getDownloadURL()
            .then((url) => {
              setTrueImagePath(url);
            });

          setImagePath(imagePath);
        });
    };

    const getImagePath = (documentSnapshot) =>{
      return documentSnapshot.get('imagePath');
    };

    const getName = (documentSnapshot) =>{
      return documentSnapshot.get('name');
    };

    const getEmail= (documentSnapshot) =>{
      return documentSnapshot.get('email');
    };

    const getUsername= (documentSnapshot) =>{
      return documentSnapshot.get('username');
    };

    loadOldEmail();
    loadOldName();
    loadOldUsername();
    loadImagePath();
  }, []);

  function createTwoButtonAlertForDelete(){
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This CANNOT be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteAccount() }
      ],
      { cancelable: true }
    );
  }

  async function checkUsername(user)
  {
    var temp = true;
    const load = async (user)=>{//loads email from a given username
      await firebase.firestore().collection('Users').where('username', '==', user).get()
        .then(querySnapshot => {
          if (querySnapshot.size > 0) {
            temp = false;//this means that it is taken
          }
        });
    };
    
    await load(user);
    return temp;
  }

  function createTwoButtonAlertForUpdate(){
    Alert.alert(
      "Update Account",
      "This will update all populated fields above. Are you sure?\n\nNote: If you have changed your email address, you will be logged out.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => updateProfile() }
      ],
      { cancelable: true }
    );
  }

  function createOneButtonAlertForUnableToUpdateUsername(){
    Alert.alert(
      "Username Already Taken",
      "Your desired username is already taken. Your Username was NOT updated.",
      [
        { text: "OK"}
      ],
      { cancelable: true }
    );
  }

  function createOneButtonAlertForSuccessPicture(){
    Alert.alert(
      "Picture Updated",
      "Your picture has been updated.",
      [
        { text: "OK"}
      ],
      { cancelable: true }
    );
  }

  async function updateProfile(){
    let logOut = false;
    var user = firebase.auth().currentUser;

    var aName = name;
    var aEmail = email;
    var aUsername = username;

    if(aName === "")
    {
      aName = oldName;
    }
    if(aEmail === "")
    {
      aEmail = oldEmail;
    }

    if(aUsername === "")
    {
      aUsername = oldUsername;
    }
    else
    {
      const check = await checkUsername(aUsername);
      if(!check && aUsername != oldUsername)
      {
        aUsername =oldUsername;
        createOneButtonAlertForUnableToUpdateUsername();
      }
    }

    const dbh = firebase.firestore().collection('Users').doc(user.uid);

    await dbh.set({
      name: aName,
      username: aUsername,
      email: aEmail
    }, {merge:true});

    user.updateProfile({
      displayName:aUsername
    });

    if (aEmail !== oldEmail) {
      user.updateEmail(aEmail);
      logOut = true;
    }

    if (logOut) {
      firebase.auth().signOut().then(() => {
        props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'Login' },
            ],
          })
        );
      });
    }
    else {
      props.navigation.navigate("Home", { navigation: props.navigation });
    }
  }

  function deleteAccount(){//also deletes data under their user id from firestore
    var user = firebase.auth().currentUser;

    const dbh = firebase.firestore().collection('Users').doc(user.uid);
    dbh.delete()

    user.delete().then(function() {
    // User deleted.


    }, function(error) {
    // An error happened.
    });

    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Login' },
        ],
      })
    );
  }

  async function changePicture()
  {
    if (image) {
      var user = firebase.auth().currentUser;
      var oldImagePath = imagePath;
  
      const dbh = firebase.firestore().collection('Users').doc(user.uid)
  
      await dbh.set({
        imagePath: baseImagePath + user.uid + "__" + image.filename,
      }, {merge:true});
  
      const imageLoc = firebase.storage().ref().child(baseImagePath.concat(user.uid).concat("__").concat(image.filename));
      // Code from: https://medium.com/@ericmorgan1/upload-images-to-firebase-in-expo-c4a7d4c46d06
      const imageResponse = await fetch(image.uri);
      const imageBlob = await imageResponse.blob();
      setIsUploadInProgress(true);
      let uploadImageStatus = imageLoc.put(imageBlob);
  
      // Code from: https://firebase.google.com/docs/reference/js/firebase.storage.UploadTask#on
      uploadImageStatus.on(firebase.storage.TaskEvent.STATE_CHANGED, {
        'complete': async function() {
  
            },
        'error': function() {
          Alert.alert(
            "Error Adding Picture",
            "There was an error when uploading the image.",
            [
              {text: "OK"}
            ]
          );
        }
      });
      // add in delete old image here i think
      createOneButtonAlertForSuccessPicture();
      props.navigation.navigate("Home", { navigation: props.navigation });
    }
  }

  return (
    <View style={styles.app}>
      <View style={styles.fullWidthWindow}>
        <View style={styles.smallerWidthWindow}>
          <Image 
            source={{uri: trueImagePath ? trueImagePath : Image.resolveAssetSource(defaultImage).uri}}
            style={styles.editAccountProfile} 
          />
          <UploadImage image={image} setImage={setImage} isProfilePicture={true} />
          <Button 
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            title="Change Profile Picture"
            onPress= {() => changePicture()}
          />
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              textAlign="center"
              placeholder="name"
              placeholderTextColor={colors.text}
              value={name}
              onChangeText={name => setName(name)}
            />
            <TextInput
              style={styles.inputText}
              textAlign="center"
              placeholder="username"
              placeholderTextColor={colors.text}
              value={username}
              onChangeText={username => setUsername(username)}
            />
            <TextInput
              style={styles.inputText}
              textAlign="center"
              placeholder="email"
              placeholderTextColor={colors.text}
              value={email}
              onChangeText={email => setEmail(email)}
            />
          </View>
          <Button 
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            title="Change Password" onPress={() => props.navigation.navigate("PasswordReset")}
          />
          <Button 
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            title="Update Profile Information" onPress={() => createTwoButtonAlertForUpdate() }
          />
          <Button
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            title="Delete Account" onPress={() => createTwoButtonAlertForDelete()}
          />
        </View>
      </View>
    </View>
  );
};

export default EditAccount;