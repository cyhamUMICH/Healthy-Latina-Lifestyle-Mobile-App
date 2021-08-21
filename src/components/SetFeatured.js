import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert } from "react-native";
import { Icon } from 'react-native-elements';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import * as firebase from 'firebase/app';
import "firebase/firestore";

const SetFeatured = (props) => {
  const [isFeatured, setIsFeatured] = useState(props.item.featured);
  const [admin, setAdmin] = useState(false);

  const submit = async (newValue) => {
    const dbh = firebase.firestore();
    const docRef = await dbh.collection(props.firebaseCollectionName).doc(props.item.contentID);
    
    await docRef.update({
      featured: newValue
    })
    .then(() => {
      let message = (newValue) ? "featured." : "not featured.";
      message = "This content is now " + message;

      Alert.alert(
        "Content Successfully Updated",
        message,
        [
          {text: "OK"}
        ]
      );
    })
    .catch(() => {
      Alert.alert(
        "Error Updating Content",
        "There was an error when updating the content.",
        [
          {text: "OK"}
        ]
      );
    });
  };

  useEffect(() => {
    const loadAdmin = async () =>{
      var user = firebase.auth().currentUser
        if (user) {
          await firebase.firestore().collection('Users').doc(user.uid).get()
            .then(documentSnapshot => getAdmin(documentSnapshot))
            .then(admin => setAdmin(admin));
        }
        else {
          setAdmin(false);
        }
    };
    
    const getAdmin = (documentSnapshot) =>{
      return documentSnapshot.get('admin');
    };

    loadAdmin();
  },[]);

  return(
    admin ?
      <TouchableOpacity style={styles.floatingActionButtonTopRight} 
        onPress={async () => {
          // Update Firestore
          await submit(!isFeatured);
          // Update the item so change persists in app even without refreshing the content list data from Firestore
          props.item.featured = !isFeatured;
          setIsFeatured(!isFeatured);
        }}>
        <View style={styles.floatingActionIcon}>
          { isFeatured ?
            <Icon name="star" type="material" 
              color={colors.text} size={styles.setFeaturedIconSize}/> 
          :
            <Icon name="star-outline" type="material" color={colors.text} size={styles.setFeaturedIconSize}/> 
          }
        </View>
      </TouchableOpacity>
    : null
  );
};

export default SetFeatured;