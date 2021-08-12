import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { styles } from '../styles/Styles';
import ContentList from '../components/ContentList';
import LoadingSpinner from '../components/LoadingSpinner';
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";
import JournalPromptList from '../components/JournalPromptList';
import UserJournalEntryList from '../components/UserJournalEntryList';

const JournalEntryList = (props) => {
  const [data, setData] = useState([]);           
  const [isLoaded, setIsLoaded] = useState(false);



  useEffect(() => {
    const fetchList = async () => {
      const dbh = firebase.firestore();
      dbh.collection("journalEntry").get()
      .then((querySnapshot) => {

        if (querySnapshot.size == 0) {
          setIsLoaded(true);
        }
        else {
          let countImages = 0;
          querySnapshot.forEach((doc) => {
            let newDoc = doc.data();
            newDoc.contentID = doc.id;

            // console.log("GERRE NOW" + newDoc.journalPrompt.id)
            
            // https://firebase.google.com/docs/storage/web/download-files
            let storage = firebase.storage();
            let pathReference = storage.ref(newDoc.theText);
            pathReference.getDownloadURL()
            .then((url) => {
              newDoc.theText = url;
            })
            .catch((error) => {
              newDoc.theText = "";
            })
            .finally(() => {
              // Add to the data list once the image has been resolved
              setData(oldList => [...oldList, newDoc]);
              
              countImages++;

              // Data is loaded once the number of images is the same as
              // the number in the snapshot
              if (querySnapshot.size === countImages) {
                setIsLoaded(true);
              }
            });
          })
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
          data={data.sort((docA, docB) => docB.dateAdded - docA.dateAdded)}
          filterBy="Difficulty,Language,Topic,Duration" />
        : <LoadingSpinner />
    }
    
    </View>
  );
};

export default JournalEntryList;