import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { styles } from '../styles/Styles';
import LoadingSpinner from '../components/LoadingSpinner';
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";
import UserJournalEntryList from '../components/UserJournalEntryList';

const JournalEntryList = (props) => {
  const [data, setData] = useState([]);           
  const [isLoaded, setIsLoaded] = useState(false);



  useEffect(() => {
    const fetchList = async () => {
      const dbh = firebase.firestore();
      dbh.collection("journalEntry").where("userID", "==", firebase.auth().currentUser.uid).get()
      .then((querySnapshot) => {

        console.log("query snapshot" + querySnapshot.size)

        if (querySnapshot.size == 0) {
          setIsLoaded(true);
        }
        else {
          let count = 0;
          querySnapshot.forEach((doc) => {
            let newDoc = doc.data();
            newDoc.contentID = doc.id;
            
            setData(oldList => [...oldList, newDoc]);
            count++;

            if (querySnapshot.size === count) {
              setIsLoaded(true);
            }
          });
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    };
  
    fetchList();  
  }, []);

  return (
  
    <View style={styles.app}>
    {
      isLoaded ? 
        <UserJournalEntryList
          contentComponent="JournalEntry"
          navigation={props.navigation}
          contentType="journalEntry"
          data={data.sort((docA, docB) => docB.dateEntryEdited - docA.dateEntryEdited)}
          filterBy="Difficulty,Language,Topic,Duration" />
        : <LoadingSpinner />
    }
    
    </View>
  );
};

export default JournalEntryList;