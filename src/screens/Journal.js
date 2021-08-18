import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { styles } from '../styles/Styles';
import ContentList from '../components/ContentList';
import LoadingSpinner from '../components/LoadingSpinner';
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";
import JournalPromptList from '../components/JournalPromptList';

const Journal = (props) => {
  const [data, setData] = useState([]);           
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      const dbh = firebase.firestore();
      dbh.collection("journalPrompts").get()
      .then((querySnapshot) => {

        if (querySnapshot.size == 0) {
          setIsLoaded(true);
        }
        else {
          let countImages = 0;
          querySnapshot.forEach((doc) => {
            let newDoc = doc.data();
            newDoc.contentID = doc.id;
            
            // https://firebase.google.com/docs/storage/web/download-files
            let storage = firebase.storage();
            let pathReference = storage.ref(newDoc.difficulty);
            pathReference.getDownloadURL()
            .then((url) => {
              newDoc.difficulty = url;
            })
            .catch((error) => {
              newDoc.difficulty = "";
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
        <JournalPromptList 
          contentComponent="JournalEntry"
          navigation={props.navigation}
          contentType="journalPrompts"
          data={data.sort((docA, docB) => docB.dateAdded - docA.dateAdded)}
          filterBy="Difficulty,Language,Topic,Duration" />
        : <LoadingSpinner />
    }
    </View>
  );
};

export default Journal;